import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    NativeEventEmitter,
    NativeModules, Dimensions
} from 'react-native';
import StatusBarLeftButton from '../components/common/StatusBarLeftButton'
import Modal from 'react-native-simple-modal';
import BleManager from 'react-native-ble-manager';
import {
    Header,
    Main,
    Footer,
} from '../components/home-view';
import Actions from '../actions';
import NotificationCenter from "../public/Com/NotificationCenter/NotificationCenter";

let {height, width} = Dimensions.get('window');
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class HomeView extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            title:"鞋垫搜索",
            headerLeft: (
                <StatusBarLeftButton onPress={params.settingAction} title="设置" ></StatusBarLeftButton>
            ),
        };
    };
    isFirst = true
    state = {open: true};
    constructor(props){
        super(props);
        this.state = {isVisible: true}
    }
    _settingAction(){
        // this.props.navigation.navigate('Setting',{settingValue: this.settingValue})
    }
    componentWillMount() {

        this.props.navigation.setParams({ settingAction: this._settingAction.bind(this) });

        this.props.navigation.addListener(
            'didFocus',
            payload => {
                setTimeout(() => {
                    setTimeout(() => {this.props.actions.startSearchDevice()}, 500)
                    this.isFirst = false
                    this.setState({isVisible: true});
                }, 500)
            }
        );
        this.props.navigation.addListener(
            'willBlur',
            payload => {
                this.props.actions.stopSearchDevice();
                this.setState({isVisible: false});
            }
        );

        this.updateListListener = NotificationCenter.createListener(NotificationCenter.name.search.updateList, this.updateDeviceList.bind(this), '');
    }

    updateDeviceList(data) {
        if (data.data) {
            this.props.actions.updateDeviceList(data.data)
        }
    }
    componentDidMount() {
        bleManagerEmitter.addListener(
            'BleManagerDidUpdateState',
            (args) => {
                if (args.state === 'off') {
                    if (Platform.OS === 'android' ) {
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
                        this.setState({open: true})
                    }
                } else {
                    if (this.isFirst) {
                        setTimeout(() => {this.props.actions.startSearchDevice()}, 500)
                        this.isFirst = false
                    } else {
                        //TODO 刷新？
                    }
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
    componentWillUnmount(){
        bleManagerEmitter.removeAllListeners('BleManagerDidUpdateState')
        bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral')
        NotificationCenter.removeListener(this.updateListListener);
        this.props.actions.stopSearchDevice()
    }
    render() {
        return (
            <View style={styles.container}>
                <Header {...this.props}/>
                <Main {...this.props} isVisible={this.state.isVisible}/>
                <Footer {...this.props}/>

                <View style={{position:'absolute',width: this.state.open?width:0, height: this.state.open?height:0}}>
                    <View  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Modal
                            offset={0}
                            open={this.state.open}
                            modalDidOpen={() => console.log('蓝牙提示框开启')}
                            modalDidClose={() => this.setState({open: false})}
                            style={{alignItems: 'center'}}>
                            <View>
                                <Text style={{fontSize: 20, marginBottom: 10}}>蓝牙未开启，请开启蓝牙!</Text>
                                <TouchableOpacity
                                    style={{margin: 5}}
                                    onPress={() => this.setState({open: false})}>
                                    <Text>好的</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
});

function mapStateToProps(state) {
    return {
        home_data: state.home
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeView);

