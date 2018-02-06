import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import Navigator from 'react-native-deprecated-custom-components'
import HomeView from './HomeView';
import DeviceView from './DeviceView';

const ROUTES = { HomeView, DeviceView };

class App extends Component {
    renderScene = (route, navigator) => {
        let Scene = ROUTES[route.name];
        return <Scene {...route} navigator={navigator}/>;
    }
    configureScene = (route, routeStack) => {
        switch (route.name){
            case 'DeviceView'://设备的页面，从底部划出
                return Navigator.SceneConfigs.FloatFromBottom;
            default:
                return Navigator.SceneConfigs.PushFromRight;
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Navigator
                    initialRoute={{name: 'HomeView'}}
                    renderScene={this.renderScene}
                    configureScene={this.configureScene}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default App;