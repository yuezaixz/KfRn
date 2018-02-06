import * as types from '../constants/ActionTypes';

export function deviceDisconnect() {
    return {type: types.DEVICE_DISCONNECT}
}

export function startReadVersion() {
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
