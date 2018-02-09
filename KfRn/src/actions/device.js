import * as types from '../constants/ActionTypes';
import {
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

var handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
//handlerUpdate.remove(); //不移除就会一直占用内存

function handleUpdateValueForCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' text ' + data.text + ' characteristic ' + data.characteristic, data.value);
    var datas = data.value
    var dataStr = data.text
    if (datas[0] == 86) {
        //todo 还要过滤
        dispatch({type: types.READ_VERSION, version: dataStr})
    }
}

import { stringToBytes } from 'convert-string';

export function deviceDisconnect(uuid) {
    return async (dispatch, getState) =>{
        dispatch({type: types.DEVICE_DISCONNECT, uuid: uuid})
        BleManager.disconnect(uuid)
            .then(() => {
                dispatch({type: types.SUCCESS_DEVICE_CONNECT, uuid: uuid})
            })
            .catch((error) => {
                dispatch({type: types.FAIL_DEVICE_DISCONNECT, errorMsg: error})
            });

    }



    return {type: types.DEVICE_DISCONNECT}
}

export function startReadVersion(uuid, serviceUUID, writeUUID) {
    const data = stringToBytes('VN');
    BleManager.write(uuid, serviceUUID, writeUUID, data)
        .then(() => {
            //todo 写入成功
            console.log('Write: ' + data);

            //如何读到回写的数据呢?
        })
        .catch((error) => {

            //todo 写入失败
            console.log(error);
        });

    return {type: types.START_READ_VERSION}
}

export function readVersion(version) {
    return {type: types.READ_VERSION, version}
}

export function startReadInsoleData() {
    return {type: types.START_READ_INSOLE_DATA}
}

export function stopReadInsoleData() {
    return {type: types.STOP_READ_INSOLE_DATA}
}

export function readInsoleData(insoleData) {
    return {type: types.READ_INSOLE_DATA, insoleData}
}

export function startReadVoltage() {
    return {type: types.START_READ_VOLTAGE}
}

export function readVoltage(voltage) {
    return {type: types.READ_VOLTAGE, voltage}
}

export function startReadBatch() {
    return {type: types.START_READ_BATCH}
}

export function readBatch(batch) {
    return {type: types.READ_BATCH, batch}
}

export function startReadStep() {
    return {type: types.START_READ_STEP}
}

export function readStep(step) {
    return {type: types.READ_STEP, step}
}
