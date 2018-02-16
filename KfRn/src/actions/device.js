import * as types from '../constants/ActionTypes';
import {
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

function writeData(uuid, serviceUUID, writeUUID, successType, command, func) {
    BleManager.write(uuid, serviceUUID, writeUUID, command)
        .then(() => {
            //todo 写入成功
            if (func) {
                func()
            }
        })
        .catch((error) => {
            //todo 写入失败
            console.log(error);
        });

    return {type: successType}
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
    return writeData(uuid, serviceUUID, writeUUID, types.START_READ_VERSION, data);
}

export function readVersion(version) {
    return {type: types.READ_VERSION, version}
}

export function startReadInsoleData(uuid, serviceUUID, writeUUID) {
    const data = stringToBytes('E');
    return writeData(uuid, serviceUUID, writeUUID, types.START_READ_INSOLE_DATA, data);
}

export function stopReadInsoleData(uuid, serviceUUID, writeUUID) {
    const data = stringToBytes('D');
    return writeData(uuid, serviceUUID, writeUUID, types.STOP_READ_INSOLE_DATA, data);
}

export function readInsoleData(insoleData) {
    return {type: types.READ_INSOLE_DATA, insoleData}
}

export function startCheckVoltage(uuid, serviceUUID, writeUUID) {
    const data = stringToBytes('BR');

    return writeData(uuid, serviceUUID, writeUUID, types.START_CHECK_VOLTAGE, data);
}

export function startReadVoltage(uuid, serviceUUID, writeUUID) {
    const data = stringToBytes('BG');

    return writeData(uuid, serviceUUID, writeUUID, types.START_READ_VOLTAGE, data);
}

export function readVoltage(voltage) {
    return {type: types.READ_VOLTAGE, voltage}
}

export function startReadBatch(uuid, serviceUUID, writeUUID) {
    const data = stringToBytes('GS');
    return writeData(uuid, serviceUUID, writeUUID, types.START_READ_BATCH, data);
}

export function readBatch(batch) {
    return {type: types.READ_BATCH, batch}
}

export function startReadStep(uuid, serviceUUID, writeUUID) {
    const data = stringToBytes('W');
    return writeData(uuid, serviceUUID, writeUUID, types.START_READ_STEP, data);
}

export function readStep(step) {
    return {type: types.READ_STEP, step}
}
