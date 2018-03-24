import * as types from '../constants/ActionTypes';
import * as BleUUIDs from '../constants/BleUUIDs';
import DeviceManager from '../manager/DeviceManager'

export function startSearchDevice() {
    return async (dispatch, getState) =>{
        dispatch({type: types.START_SEARCH_DEVICE})

        DeviceManager.ShareInstance().startSearchDevice().then(() => {
            dispatch({type: types.START_SEARCH_DEVICE})
        }).catch(error => {
            console.log(error)
            //重复开始，暂不处理了
        })
    }
}

export function updateDeviceList(list) {
    return {type: types.UPDATE_DEVICE_LIST, devices: list}
}

export function stopSearchDevice() {
    DeviceManager.ShareInstance().stopSearchDevice()
    return {type: types.STOP_SEARCH_DEVICE}
}

export function startDeviceConnect(device, isLeft) {
    stopSearchDevice()//连接前停止搜索
    console.log("开始连接"+isLeft?"左":"右")
    return async (dispatch, getState) =>{
        dispatch({type: types.START_DEVICE_CONNECT, uuid: device.uuid, isLeft})
        DeviceManager.ShareInstance().startDeviceConnect(device, isLeft)
            .then((device)=>{
                dispatch({
                    type: types.SUCCESS_DEVICE_CONNECT, isLeft, device})
            }).catch(error => {
                dispatch({type: types.FAIL_DEVICE_CONNECT, errorMsg: error, isLeft})
            })
        }
}
