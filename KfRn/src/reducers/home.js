import * as types from '../constants/ActionTypes';

const initialState = {
    isSearching: false,
    isConnecting: false,
    serviceUUID: '',
    noitfyUUID: '',
    writeUUID: '',
    failConnectedMsg: '',
    device_list: []
}

export default function home(state = initialState, action) {
    switch(action.type) {
        case types.START_SEARCH_DEVICE:
            return {...state, isSearching: true};
        case types.STOP_SEARCH_DEVICE:
            return {...state, isSearching: false};
        case types.START_DEVICE_CONNECT:
            return {...state, failConnectedMsg: "", isConnecting: true};
        case types.SUCCESS_DEVICE_CONNECT:
            return {...state, isConnecting: false, uuid: action.uuid, serviceUUID: action.serviceUUID, noitfyUUID: action.noitfyUUID, writeUUID: action.writeUUID};
        case types.FAIL_DEVICE_CONNECT:
            return {...state, isConnecting: false, failConnectedMsg: action.errorMsg};
        case types.UPDATE_DEVICE_LIST:
            return {...state, device_list: [...state.device_list, ...action.devices]};
    }

    return state;
}