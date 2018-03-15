'use strict';

module.exports = {
    search:{
        startSearch: 'com.podoon.startSearch',
        updateList:'com.podoon.List',
        stopSearch:'com.podoon.stopSearch',
        loseConnecting:'com.podoon.loseConnecting',
        reconnect:'com.podoon.reconnect'
    },
    deviceData: {
        voltage: 'com.podoon.voltage',                //读取到电量
        batch: 'com.podoon.batch',                //读取到批次
        successSensorAdjust: 'com.podoon.successSensorAdjust',               //校准某传感器成功
        readInsoleData: 'com.podoon.readInsoleData',
        readMacAddress: 'com.podoon.readMacAddress',
        readAdjust: 'com.podoon.readAdjust',
        readVersion: 'com.podoon.readVersion',
        readStep: 'com.podoon.readStep',
    }
};
