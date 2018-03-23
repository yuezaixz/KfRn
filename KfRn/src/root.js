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
import DeviceManager from './manager/DeviceManager'


class Root extends Component {
    componentWillMount() {
        DeviceManager.ShareInstance().setUp()
    }
    componentDidMount() {
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