import * as types from '../constants/ActionTypes';

const initialState = {
    isSearching: false,
    isConnecting: false,
    connecting_uuid:'',
    serviceUUID: '',
    noitfyUUID: '',
    writeUUID: '',
    failConnectedMsg: '',
    //测试数据
    // device_list: [{name:'Test1',uuid:'aaaa',rssi:-34},{name:'Test2',uuid:'bbbb',rssi:-48}]
    device_list: []
}

export default function home(state = initialState, action) {
    switch(action.type) {
        case types.START_SEARCH_DEVICE:
            var temp = {...state, isSearching: true};
            return temp;
        case types.STOP_SEARCH_DEVICE:
            return {...state, isSearching: false};
        case types.START_DEVICE_CONNECT:
            return {...state, failConnectedMsg: "", isConnecting: true, connecting_uuid: action.uuid};
        case types.SUCCESS_DEVICE_CONNECT:
            return action.isLeft? {...state, isConnecting: false, connecting_uuid:'', leftDevice:action.device} :
                {...state, isConnecting: false, connecting_uuid:'', rightDevice:action.device};
        case types.FAIL_DEVICE_CONNECT:
            return {...state, isConnecting: false, connecting_uuid:'', failConnectedMsg: action.errorMsg};
        case types.UPDATE_DEVICE_LIST:
            return {...state, device_list: [...action.devices]};

        case types.DEVICE_DISCONNECT:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:null};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:null};
            } else {
                return state;
            }
        case types.START_READ_VERSION:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingVersion: true}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingVersion: true}};
            } else {
                return state;
            }
        case types.READ_VERSION:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingVersion: false, version: action.version}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingVersion: false, version: action.version}};
            } else {
                return state;
            }
        case types.START_READ_VOLTAGE:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingVoltage: true}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingVoltage: true}};
            } else {
                return state;
            }
        case types.READ_VOLTAGE:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingVoltage: false, voltage: action.voltage}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingVoltage: false, voltage: action.voltage}};
            } else {
                return state;
            }
        case types.START_READ_BATCH:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingBatch: true}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingBatch: true}};
            } else {
                return state;
            }
        case types.READ_BATCH:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingBatch: false, batch: action.batch}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingBatch: false, batch: action.batch}};
            } else {
                return state;
            }
        case types.START_READ_STEP:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingStep: true}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingStep: true}};
            } else {
                return state;
            }
        case types.READ_STEP:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingStep: false, totalStep: action.step}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingStep: false, totalStep: action.step}};
            } else {
                return state;
            }
        case types.START_READ_INSOLE_DATA:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingInsoleData: false}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingInsoleData: false}};
            } else {
                return state;
            }
        case types.STOP_READ_INSOLE_DATA:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice, isReadingInsoleData: false}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, isReadingInsoleData: false}};
            } else {
                return state;
            }
        case types.READ_INSOLE_DATA:
            if (action.uuid == state.leftDevice.uuid) {
                return {...state, leftDevice:{...state.leftDevice,  insoleData: [action.point1, action.point2, action.point3]}};
            } else if (action.uuid == state.rightDevice.uuid) {
                return {...state, rightDevice:{...state.rightDevice, insoleData: [action.point1, action.point2, action.point3]}};
            } else {
                return state;
            }
        case types.READ_INSOLE_DATA:
            return {...state, leftDevice:null, rightDevice:null};
    }

    return state;
}