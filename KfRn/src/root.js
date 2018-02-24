import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './containers/App';
import configureStore from './store/configureStore';
import BleManager from 'react-native-ble-manager';

class Root extends Component {
    componentWillMount() {
        BleManager.start({showAlert: false, forceLegacy: true})
            .then(() => {
                // Success code
                console.log('Module initialized');
            });
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