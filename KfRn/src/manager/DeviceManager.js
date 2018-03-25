import BleManager from 'react-native-ble-manager';
import {
    Platform,
    NativeEventEmitter,
    NativeModules
} from 'react-native';
import * as BleUUIDs from "../constants/BleUUIDs";
import * as util from "../utils/InsoleUtils";
import NotificationCenter from '../public/Com/NotificationCenter/NotificationCenter'
import { stringToBytes } from 'convert-string';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

let instance = null;

export default class DeviceManager{
    loopTimer = 0;
    isSearching = false;
    lastUpdateTime = 0;
    loopCallback = null;
    device_list = [];
    leftDevice = null
    rightDevice = null

    isLoseConnecting = false;
    isLoseConnectingRight = false;

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    reconnect(device) {
        console.log('开始重连')
        if (this.isLoseConnecting){
            this.startDeviceConnect(this.leftDevice).then((device)=>{
                this.isLoseConnecting = true
                NotificationCenter.post(NotificationCenter.name.search.reconnect, {uuid:device.uuid})
            }).catch((error)=>{
                console.log('重连失败')
                setTimeout(this.reconnect.bind(this),3000)
            })
        }

        if (this.isLoseConnectingRight){
            this.startDeviceConnect(this.rightDevice).then((device)=>{
                this.isLoseConnectingRight = true
                NotificationCenter.post(NotificationCenter.name.search.reconnect, {uuid:device.uuid})
            }).catch((error)=>{
                console.log('重连失败')
                setTimeout(this.reconnect.bind(this),3000)
            })
        }
    }

    setUp() {
        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic.bind(this) );
        this.disconnectListener = bleManagerEmitter.addListener(
            'BleManagerDisconnectPeripheral',
            ((args) => {
                if(this.leftDevice && this.leftDevice.uuid == args.peripheral) {
                    //TODO 断开时候，要先设置状态，让DeviceView和AdjustView显示重连中

                    this.isLoseConnecting = true
                    NotificationCenter.post(NotificationCenter.name.search.loseConnecting, {uuid:args.peripheral})

                    this.reconnect(this.leftDevice)
                }

                if(this.rightDevice && this.rightDevice.uuid == args.peripheral) {
                    //TODO 断开时候，要先设置状态，让DeviceView和AdjustView显示重连中

                    this.isLoseConnectingRight = true
                    NotificationCenter.post(NotificationCenter.name.search.loseConnecting, {uuid:args.peripheral})

                    this.reconnect(this.rightDevice)
                }
            }).bind(this)
        );
        BleManager.start({showAlert: false})
            .then(() => {
                // Success code
                console.log('Module initialized');
            });
    }

    handleUpdateValueForCharacteristic(data) {
        //TODO 返回值用listener吧，电量的写好了，待测试

        var datas = data.value
        var dataStr = util.arrayBufferToBase64Str(datas)
        if (datas[0] != 1) {
            console.log('Received data from ' + data.peripheral + ' text ' + data.text + ' characteristic ' + data.characteristic, data.value);
            console.log(dataStr)
        }

        if (datas[0] == 1) {
            NotificationCenter.post(NotificationCenter.name.deviceData.readInsoleData, {uuid:data.peripheral, point1:datas[1], point2:datas[2], point3:datas[3]})
        } else if (datas[0] == 80 && datas[1] == 78) {
            var batch = dataStr.substring(3)
            NotificationCenter.post(NotificationCenter.name.deviceData.batch, { uuid:data.peripheral, type, batch})
        } else if (datas[0] == 86) {
            var version = dataStr.substring(3)
            NotificationCenter.post(NotificationCenter.name.deviceData.readVersion, { uuid:data.peripheral, type, version})
        } else if (datas[0] == 68) {
            var step = parseInt(dataStr.substring(3))
            NotificationCenter.post(NotificationCenter.name.deviceData.readStep, { uuid:data.peripheral, type, step})
        } else if (util.startWith(dataStr, "Batt")) {
            var voltage = dataStr.substring(5)
            NotificationCenter.post(NotificationCenter.name.deviceData.voltage, { uuid:data.peripheral, type, voltage})
        } else if (util.startWith(dataStr, "M")) {
            var macAddress = dataStr.substring(2)
            NotificationCenter.post(NotificationCenter.name.deviceData.readMacAddress, { uuid:data.peripheral, type, macAddress})
        }

    }

    static ShareInstance(){
        let singleton = new DeviceManager();
        return singleton;
    }

    startTimer(cb) {
        this.loopCallback = cb
        this.loopHandle()
    }

    endTimer (){
        this.loopTimer && cancelAnimationFrame(this.loopTimer);
        this.loopTimer = null;
    }

    loopHandle() {
        var now = new Date().getTime();
        if(now-this.lastUpdateTime>1000*1){
            this.lastUpdateTime = now;
            this.loopCallback()
        }
        this.loopTimer = requestAnimationFrame(this.loopHandle.bind(this));
    }

    //API

    typeByUUID(uuid) {
        if (uuid === this.leftDevice.uuid) {
            return 1
        } else if (uuid === this.rightDevice.uuid) {
            return 2
        }
        return 0
    }

    startCheckVoltage(uuid) {
        return this.writeData('BR', this.typeByUUID(uuid))
    }

    startReadVoltage(uuid) {
        return this.writeData('BG', this.typeByUUID(uuid))
    }
    startReadVersion(uuid) {
        return this.writeData('VN', this.typeByUUID(uuid))
    }

    startReadStep(uuid) {
        return this.writeData('W', this.typeByUUID(uuid))
    }

    startReadMacAddress(uuid) {
        return this.writeData('GM', this.typeByUUID(uuid))
    }

    startReadBatch(uuid) {
        return this.writeData('GS', this.typeByUUID(uuid))
    }

    startReadInsoleData(uuid) {
        let type = this.typeByUUID(uuid)
        return new Promise((resolve, reject) => {
            this.writeData('E', type)

            resolve()
        });
    }

    stopReadInsoleData(uuid) {
        let type = this.typeByUUID(uuid)
        return new Promise((resolve, reject) => {
            this.writeData('D', type)

            resolve()
        });
    }

    startSearchDevice() {
        this.device_list = [];
        return new Promise((resolve, reject) => {
            if (this.isSearching) {
                reject(new Error("已经在搜索中"))
            } else {
                this.lastUpdateTime = new Date().getTime();
                if (Platform.OS === 'android') {
                    BleManager.scan([BleUUIDs.SEARCH_ANDROID_SERVICE_UUID], 0, true).then((results) => {
                        console.log('Scanning...');
                    })
                }

                if (Platform.OS === 'ios') {
                    BleManager.scan([BleUUIDs.SEARCH_IOS_SERVICE_UUID], 3, true).then((results) => {
                        console.log('Scanning...');
                    })
                }
                NotificationCenter.post(NotificationCenter.name.search.startSearch)
                resolve()

                this.startTimer(() => {
                    if (Platform.OS === 'ios') {
                        BleManager.scan([BleUUIDs.SEARCH_IOS_SERVICE_UUID], 3, true).then((results) => {
                            console.log('Scanning...');
                        })
                    }

                    BleManager.getDiscoveredPeripherals([])
                        .then((peripheralsArray) => {
                            var new_list = []

                            var current_list = this.device_list || []
                            if (peripheralsArray ){
                                for (var i = 0; i < peripheralsArray.length; i++) {
                                    var peripheral = peripheralsArray[i]
                                    if (peripheral.rssi >= 0) {//不合理数据
                                        continue
                                    }
                                    var isExit = false;
                                    for (var j = 0; j < current_list.length; j++) {
                                        var device = current_list[j]
                                        if(device.uuid == peripheral.id) {
                                            isExit = true
                                            device.rssi = peripheral.rssi
                                            break
                                        }
                                    }
                                    if (!isExit) {
                                        var device = {name:peripheral.name,uuid:peripheral.id, rssi:peripheral.rssi}
                                        new_list.push(device)
                                    }
                                }
                            }

                            this.device_list = [...new_list,...current_list]

                            NotificationCenter.post(NotificationCenter.name.search.updateList, {data:this.device_list})
                        });
                });
            }
        });
    }

    stopSearchDevice() {
        this.isSearching = false;
        this.endTimer()
        BleManager.stopScan()
        NotificationCenter.post(NotificationCenter.name.search.stopSearch)
        return true
    }

    startDeviceConnect(device, isLeft) {
        this.stopSearchDevice()//连接前停止搜索
        this.isLoseConnecting = false
        return new Promise((resolve, reject) => {
            BleManager.connect(device.uuid)
                .then(() => {
                    //这里只是连上，还要notify和write
                    BleManager.retrieveServices(device.uuid)
                        .then((peripheralInfo) => {
                            console.log('Peripheral info:', peripheralInfo);
                            var notifyCharacteristic = null
                            var writeCharacteristic = null
                            if (peripheralInfo.characteristics) {
                                for (var i = 0; i < peripheralInfo.characteristics.length; i++) {
                                    var characteristic = peripheralInfo.characteristics[i]
                                    if (characteristic.characteristic.toUpperCase() == BleUUIDs.PODOON_NOTIFICATION_CHARACTERISTIC_UUID) {
                                        notifyCharacteristic = characteristic.characteristic
                                    } else if (characteristic.characteristic.toUpperCase() == BleUUIDs.PODOON_WRITE_CHARACTERISTIC_UUID) {
                                        writeCharacteristic = characteristic.characteristic
                                    }
                                }
                            }
                            if (notifyCharacteristic && writeCharacteristic) {
                                BleManager.startNotification(device.uuid, BleUUIDs.PODOON_SERVICE_UUID, notifyCharacteristic)
                                    .then(() => {
                                        if (isLeft) {
                                            this.leftDevice = {...device, serviceUUID:BleUUIDs.PODOON_SERVICE_UUID,
                                                noitfyUUID: notifyCharacteristic, writeUUID: writeCharacteristic}
                                            resolve(this.leftDevice)
                                        } else {
                                            this.rightDevice = {...device, serviceUUID:BleUUIDs.PODOON_SERVICE_UUID,
                                                noitfyUUID: notifyCharacteristic, writeUUID: writeCharacteristic}
                                            resolve(this.rightDevice)
                                        }
                                    })
                                    .catch((error) => {
                                        reject(new Error("startNotification失败"+error))
                                    });

                            } else {
                                reject(new Error("鞋垫特征初始化失败"))
                            }
                        });

                })
                .catch((error) => {
                    reject(error)
                });
        });
    }

    deviceDisconnect(uuid) {
        let type = this.typeByUUID(uuid)
        return new Promise((resolve, reject) => {
            let currentDevice = type == 1 ? this.leftDevice : this.rightDevice
            if (type <= 0) {
                reject(new Error("类型错误"))
            } else if (!currentDevice) {
                reject(new Error('无当前设备'))
            } else if(this.isLoseConnecting) {
                resolve(currentDevice.uuid)
                this.isLoseConnecting = false
            } else {
                this.isLoseConnecting = false
                BleManager.disconnect(currentDevice.uuid)
                    .then(() => {
                        resolve(currentDevice.uuid)
                    })
                    .catch((error) => {
                        reject(error)
                    });
            }
        });
    }

    writeData(command, type) {
        if (type > 0) {
            console.log(command)
            const data = stringToBytes(command);
            let current_device = type == 1 ? this.leftDevice : this.rightDevice
            return new Promise((resolve, reject) => {
                if (current_device) {
                    BleManager.write(current_device.uuid, current_device.serviceUUID, current_device.writeUUID, data)
                        .then(() => {
                            resolve()
                        })
                        .catch((error) => {
                            reject(error)
                        });
                } else {
                    reject(new Error("未连接设备"))
                }
            });

        }
    }

}
