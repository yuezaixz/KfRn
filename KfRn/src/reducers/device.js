import * as types from '../constants/ActionTypes';

export default function(state = {index: 0}, action) {
    switch(action.type) {
        case types.DEVICE_DISCONNECT:
            return {...state, uuid: "", serviceUUID: "", noitfyUUID: "", writeUUID: ""};
        case types.START_READ_VERSION:
            return {...state, isReadingVersion: true};
        case types.READ_VERSION:
            return {...state, isReadingVersion: false, version: action.version};
        case types.START_READ_VOLTAGE:
            return {...state, isReadingVoltage: true};
        case types.READ_VOLTAGE:
            return {...state, isReadingVoltage: false, voltage: action.voltage};
        case types.START_READ_BATCH:
            return {...state, isReadingBatch: true};
        case types.READ_BATCH:
            return {...state, isReadingBatch: false, voltage: action.batch};
        case types.START_READ_STEP:
            return {...state, isReadingStep: true};
        case types.READ_STEP:
            return {...state, isReadingStep: false, voltage: action.step};
        case types.START_READ_INSOLE_DATA:
            return {...state, isReadingInsoleData: true};
        case types.STOP_READ_INSOLE_DATA:
            return {...state, isReadingInsoleData: false};
        case types.READ_INSOLE_DATA:
            return {...state, insoleData: insoleData};
    }

    return state;
}