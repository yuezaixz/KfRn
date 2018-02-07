import * as types from '../constants/ActionTypes';
import * as BleUUIDs from '../constants/BleUUIDs';
import BleManager from 'react-native-ble-manager';

var loopTimer = 0;

function endTimer(){
    loopTimer && cancelAnimationFrame(loopTimer);
    loopTimer = null;
}

export function startSearchDevice() {
    var lastUpdateTime = 0;
    var callback = null;
    function startTimer(cb) {
        callback = cb
        loopHandle()

    }

    function loopHandle() {
        var now = new Date().getTime();
        if(now-lastUpdateTime>1000*1){
            lastUpdateTime = now;
            callback()
        }
        loopTimer = requestAnimationFrame(loopHandle);
    }

    return async (dispatch, getState) =>{
        dispatch({type: types.START_SEARCH_DEVICE})
        var now = new Date().getTime();
        lastUpdateTime = now;
        startTimer(function () {
            BleManager.scan([BleUUIDs.SEARCH_SERVICE_UUID], 3, true).then((results) => {
                console.log('Scanning...');
                BleManager.getDiscoveredPeripherals([])
                    .then((peripheralsArray) => {
                        var new_list = []

                        var tempState = getState()
                        var current_list = tempState.home.device_list || []
                        if (peripheralsArray ){
                            for (var i = 0; i < peripheralsArray.length; i++) {
                                var peripheral = peripheralsArray[i]
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
                                    new_list.push({name:peripheral.name,uuid:peripheral.id, rssi:peripheral.rssi})
                                }
                            }
                        }

                        new_list = [...new_list,...current_list]
                        dispatch({type: types.UPDATE_DEVICE_LIST, devices:new_list})
                    });
            })
        });

    }
}

export function stopSearchDevice() {
    endTimer()
    return {type: types.STOP_SEARCH_DEVICE}
}

export function startDeviceConnect(uuid) {
    return {type: types.START_DEVICE_CONNECT, uuid}
}

export function successDeviceConnect(uuid, serviceUUID, noitfyUUID, writeUUID) {
    return {type: types.SUCCESS_DEVICE_CONNECT, uuid, serviceUUID, noitfyUUID, writeUUID}
}

export function failDeviceConnect(errorMsg) {
    return {type: types.FAIL_DEVICE_CONNECT, errorMsg}
}
