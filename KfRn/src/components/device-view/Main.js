import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import {Theme} from "../../styles";

import NotificationCenter from '../../public/Com/NotificationCenter/NotificationCenter'

let {height, width} = Dimensions.get('window');

class Main extends Component {
    handleVersion = ()=>{
        this.props.actions.startReadVersion(this.props.device_data.leftDevice.uuid)
        this.props.getLoading().show()
    }
    handleVoltage = ()=>{
        this.props.actions.startReadVoltage(this.props.device_data.leftDevice.uuid)
        this.props.getLoading().show()
    }
    handleInsoleDatas = ()=>{
        if (this.props.device_data.isReadingInsoleData) {
            this.props.actions.stopReadInsoleData(this.props.device_data.leftDevice.uuid)
            this.props.actions.stopReadInsoleData(this.props.device_data.rightDevice.uuid)

            var insole_data = [0,0,0]
            this.props.actions.readInsoleData(this.props.device_data.leftDevice.uuid,...insole_data)
            this.props.actions.readInsoleData(this.props.device_data.rightDevice.uuid,...insole_data)
        } else {
            this.props.actions.startReadInsoleData(this.props.device_data.leftDevice.uuid)
            this.props.actions.startReadInsoleData(this.props.device_data.rightDevice.uuid)
        }

    }

    readVoltage(data) {
        if (data.uuid) {
            this.props.actions.readVoltage(data.uuid, data.voltage)
        }

        this.props.getLoading().dismiss()
    }

    readVersion(data) {
        if (data.uuid) {
            this.props.actions.readVersion(data.uuid, data.version)
        }

        this.props.getLoading().dismiss()
    }

    readInsoleData(data) {
        if (data.uuid) {
            this.props.actions.readInsoleData(data.uuid, data.point1, data.point2, data.point3)
        }
        this.props.getLoading().dismiss()
    }

    disconnectHandle(){
        console.log('recive loseConnecting')
        this.props.getLoading().show('已断开')
    }

    reconnectHandle(){
        console.log('recive reconnect')
        this.props.getLoading().dismiss()
    }

    componentDidMount() {
        this.voltageListener = NotificationCenter.createListener(NotificationCenter.name.deviceData.voltage, this.readVoltage.bind(this), '');
        this.versionListener = NotificationCenter.createListener(NotificationCenter.name.deviceData.readVersion, this.readVersion.bind(this), '');
        this.readInsoleDataListener = NotificationCenter.createListener(NotificationCenter.name.deviceData.readInsoleData, this.readInsoleData.bind(this), '');
        this.disconnectListener = NotificationCenter.createListener(NotificationCenter.name.search.loseConnecting, this.disconnectHandle.bind(this), '');
        this.reconnectListener = NotificationCenter.createListener(NotificationCenter.name.search.reconnect, this.reconnectHandle.bind(this), '');
    }
    componentWillUnmount() {
        NotificationCenter.removeListener(this.versionListener);
        NotificationCenter.removeListener(this.voltageListener);
        NotificationCenter.removeListener(this.disconnectListener);
        NotificationCenter.removeListener(this.reconnectListener);
        NotificationCenter.removeListener(this.readInsoleDataListener);
    }
    componentDidUpdate () {
        if (!this.props.device_data.leftDevice.uuid && !this.props.device_data.rightDevice.uuid) {//断开成功
            this.props.navigation.goBack()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        压力数据：{(this.props.device_data.leftDevice.insoleData || []).join(":")}
                    </Text>
                    <TouchableHighlight
                        activeOpacity={Theme.active.opacity}
                        underlayColor='transparent'
                        style={styles.shadow_btn}
                        onPress={this.handleInsoleDatas}>

                        <View>
                            <Text style={[styles.text, styles.title]}>
                                {this.props.device_data.leftDevice.isReadingInsoleData?'停止':'开始'}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        右脚压力数据：{(this.props.device_data.rightDevice.insoleData || []).join(":")}
                    </Text>
                </View>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        版本：{this.props.leftDevice.device_data.version || '--'}
                    </Text>

                    <TouchableHighlight
                        activeOpacity={Theme.active.opacity}
                        underlayColor='transparent'
                        style={styles.shadow_btn}
                        onPress={this.handleVersion}>

                        <View>
                            <Text style={[styles.text, styles.title]}>
                                读取
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        电量：{this.props.device_data.leftDevice.voltage || '--'}
                    </Text>

                    <TouchableHighlight
                        activeOpacity={Theme.active.opacity}
                        underlayColor='transparent'
                        style={styles.shadow_btn}
                        onPress={this.handleVoltage}>

                        <View>
                            <Text style={[styles.text, styles.title]}>
                                读取
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    shadow_btn: {
        width: 50,
        height: 30,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#AAAAAA',
        position:'absolute',
        right:20,
        alignItems:'center',
        justifyContent:'center'
    },
    container: {
        height:height-100-80,
    },
    insole_info: {
        paddingTop:20,
        height: 60,
        width:width
    },
    text: {
        color: '#E85613'
    },
    title: {
        textAlign: 'center',
        fontSize: 17,
        position:'relative'
    }
});

export default Main;
