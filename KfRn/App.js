/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    NativeEventEmitter,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  componentDidMount() {
      var that = this
      BleManager.start({showAlert: false})
          .then(() => {
              // Success code
              console.log('Module initialized');
              that.startScan()
          });
  }
    startScan() {
        BleManager.scan([], 3, true).then((results) => {
            console.log('Scanning...');
            setTimeout(function () {
                BleManager.getDiscoveredPeripherals([])
                    .then((peripheralsArray) => {
                        // Success code
                        console.log(peripheralsArray);
                    });
            },3000)
        });
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
