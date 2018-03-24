import * as types from '../constants/ActionTypes';
import DeviceManager from '../manager/DeviceManager'

export function deviceDisconnect(uuid) {
    return async (dispatch, getState) =>{
        dispatch({type: types.DEVICE_DISCONNECT, uuid: uuid})
        DeviceManager
            .ShareInstance()
            .deviceDisconnect(uuid)
            .then(()=>{
                dispatch({type: types.SUCCESS_DEVICE_DISCONNECT, uuid: uuid})
            })
            .catch((error) => {
                dispatch({type: types.FAIL_DEVICE_DISCONNECT, errorMsg: error})
            });
    }

    return {type: types.DEVICE_DISCONNECT}
}

export function startCheckVoltage(uuid) {
    return async (dispatch, getState) =>{
        DeviceManager.ShareInstance().startCheckVoltage(uuid)
            .then(()=>{
                dispatch({type: types.START_CHECK_VOLTAGE, uuid})
            })
    }
}

export function startReadVoltage(uuid) {
    return async (dispatch, getState) =>{
        DeviceManager.ShareInstance().startReadVoltage()
            .then(()=>{
                dispatch({type: types.START_READ_VOLTAGE, uuid})
            })
    }
}

export function readVoltage(uuid, voltage) {
    return {type: types.READ_VOLTAGE, uuid, voltage}
}

export function startReadMacAddress(uuid) {
    return async (dispatch, getState) =>{
        DeviceManager.ShareInstance().startReadMacAddress()
            .then(()=>{
                dispatch({type: types.START_READ_MAC_ADDRESS, uuid})
            })
    }
}

export function readMacAddress(uuid, macAddress) {
    return {type: types.READ_MAC_ADDRESS, uuid, macAddress}
}

export function startReadInsoleData(uuid, callback) {
    return async (dispatch, getState) =>{
        DeviceManager.ShareInstance().startReadInsoleData(uuid)
            .then(()=>{
                dispatch({type: types.START_READ_INSOLE_DATA, uuid})
                if (callback) {
                    callback()
                }
            })
    }
}

export function stopReadInsoleData(uuid) {
    return async (dispatch, getState) =>{
        DeviceManager.ShareInstance().stopReadInsoleData(uuid)
            .then(()=>{
                dispatch({type: types.STOP_READ_INSOLE_DATA, uuid})
            })
    }
}

export function readInsoleData(uuid, point1, point2, point3) {
    return {type: types.READ_INSOLE_DATA, uuid, point1, point2, point3}
}

export function clearDeviceData(uuid) {
    return {type: types.CLEAR_DEVICE_DATA, uuid}
}

export function startReadBatch(uuid) {
    return async (dispatch, getState) =>{
        DeviceManager.ShareInstance().startReadBatch(uuid)
            .then(()=>{
                dispatch({type: types.START_READ_BATCH, uuid})
            })
    }
}

export function readBatch(uuid, batch) {
    return {type: types.READ_BATCH, uuid, batch}
}

export function startReadStep(uuid) {
    return async (dispatch, getState) =>{
        DeviceManager.ShareInstance().startReadStep(uuid)
            .then(()=>{
                dispatch({type: types.START_READ_STEP, uuid})
            })
    }
}

export function readStep(uuid, step) {
    return {type: types.READ_STEP, uuid, step}
}
