import * as types from '../constants/ActionTypes';

export function startSearchDevice() {
    return {type: types.START_SEARCH_DEVICE}
}

export function stopSearchDevice() {
    return {type: types.STOP_SEARCH_DEVICE}
}

export function updateDeviceList(devices) {
    return {type: types.UPDATE_DEVICE_LIST, devices}
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
