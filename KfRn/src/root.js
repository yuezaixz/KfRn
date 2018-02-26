import React, { Component } from 'react';
import {
    Platform,
    PermissionsAndroid,
    NativeEventEmitter,
    NativeModules
} from 'react-native';
import { Provider } from 'react-redux';

import App from './containers/App';
import configureStore from './store/configureStore';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class Root extends Component {
    componentWillMount() {
        BleManager.start({showAlert: false})
            .then(() => {
                // Success code
                console.log('Module initialized');
            });
    }
    componentDidMount() {
        bleManagerEmitter.addListener(
            'BleManagerDidUpdateState',
            (args) => {
                if (args.state === 'off') {
                    BleManager.enableBluetooth()
                        .then(() => {
                            // Success code
                            console.log('The bluetooh is already enabled or the user confirm');
                        })
                        .catch((error) => {
                            // Failure code
                            console.log('The user refuse to enable bluetooth');
                        });
                } else {
                    console.log('bluetooth state:'+args.state)
                }
            }
        );

        BleManager.checkState();
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }

    }
    render() {
        return (
            <Provider store={configureStore()}>
                <App />
            </Provider>
        );
    }
}

export default Root;