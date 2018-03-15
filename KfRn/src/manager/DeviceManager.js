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
    left_device = null
    right_device = null

    isLoseConnecting = false;

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    reconnect() {
        console.log('开始重连')
        if (this.isLoseConnecting){
            this.startDeviceConnect(this.left_device).then((device)=>{
                this.isLoseConnecting = true
                NotificationCenter.post(NotificationCenter.name.search.reconnect)
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
                if(this.left_device && this.left_device.uuid == args.peripheral) {
                    //TODO 断开时候，要先设置状态，让DeviceView和AdjustView显示重连中

                    this.isLoseConnecting = true
                    NotificationCenter.post(NotificationCenter.name.search.loseConnecting)

                    this.reconnect()
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

        console.log('Received data from ' + data.peripheral + ' text ' + data.text + ' characteristic ' + data.characteristic, data.value);
        var datas = data.value
        var dataStr = util.arrayBufferToBase64Str(datas)
        console.log(dataStr)
        var type = 0;
        if (this.left_device.uuid == data.peripheral) {
            type = 1
        } else if (this.right_device.uuid == data.peripheral) {
            type = 2
        }

        if (type > 0) {
            if (datas[0] == 1) {
                NotificationCenter.post(NotificationCenter.name.deviceData.readInsoleData, {type, point1:datas[1], point2:datas[2], point3:datas[3]})
            } else if (datas[0] == 80 && datas[1] == 78) {
                var batch = dataStr.substring(3)
                NotificationCenter.post(NotificationCenter.name.deviceData.batch, {type, batch})
            } else if (datas[0] == 86) {
                var version = dataStr.substring(3)
                NotificationCenter.post(NotificationCenter.name.deviceData.readVersion, {type, version})
            } else if (datas[0] == 68) {
                var step = parseInt(dataStr.substring(3))
                NotificationCenter.post(NotificationCenter.name.deviceData.readStep, {type, step})
            } else if (util.startWith(dataStr, "Batt")) {
                var voltage = dataStr.substring(5)
                NotificationCenter.post(NotificationCenter.name.deviceData.voltage, {type, voltage})
            } else if (util.startWith(dataStr, "M")) {
                var macAddress = dataStr.substring(2)
                NotificationCenter.post(NotificationCenter.name.deviceData.readMacAddress, {type, macAddress})
            }
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

    startCheckVoltage() {
        return this.writeData('BR', 1)
    }

    startReadVoltage() {
        return this.writeData('BG', 1)
    }
    startReadVersion() {
        return this.writeData('VN', 1)
    }

    startReadStep() {
        return this.writeData('W', 1)
    }

    startReadMacAddress() {
        return this.writeData('GM', 1)
    }

    startReadBatch() {
        return this.writeData('GS', 1)
    }

    startReadInsoleData() {
        return new Promise((resolve, reject) => {
            this.writeData('E', 1)

            resolve()
        });
    }

    stopReadInsoleData() {
        return new Promise((resolve, reject) => {
            this.writeData('D', 1)

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

    startDeviceConnect(device, type) {
        if (type <= 0) {
            throw new Error("类型错误")
        }
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
                                        if (type == 1) {
                                            this.left_device = {...device, serviceUUID:BleUUIDs.PODOON_SERVICE_UUID,
                                                noitfyUUID: notifyCharacteristic, writeUUID: writeCharacteristic}
                                            resolve(this.left_device)
                                        } else {
                                            this.right_device = {...device, serviceUUID:BleUUIDs.PODOON_SERVICE_UUID,
                                                noitfyUUID: notifyCharacteristic, writeUUID: writeCharacteristic}
                                            resolve(this.right_device)
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

    deviceDisconnect(type) {
        return new Promise((resolve, reject) => {

            let currentDevice = type == 1 ? this.left_device : this.right_device
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
            let current_device = type == 1 ? this.left_device : this.right_device
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
