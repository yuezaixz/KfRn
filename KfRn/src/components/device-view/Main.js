import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions, NativeEventEmitter, NativeModules
} from 'react-native';
import {Theme} from "../../styles";
import * as util from "../../utils/InsoleUtils"

import NotificationCenter from '../../public/Com/NotificationCenter/NotificationCenter'
import PillowManager from '../../manager/PillowManager'

let {height, width} = Dimensions.get('window');

class Main extends Component {
    handleVersion = ()=>{
        this.props.actions.startReadVersion()
    }
    handleBatch = ()=>{
        this.props.actions.startReadBatch()
    }
    handleVoltage = ()=>{
        this.props.actions.startReadVoltage()
    }
    handleStep = ()=>{
        this.props.actions.startReadStep()
    }
    handleInsoleDatas = ()=>{
        if (this.props.device_data.isReadingInsoleData) {
            this.props.actions.stopReadInsoleData(this.props.device_data.uuid, this.props.device_data.serviceUUID, this.props.device_data.writeUUID)

            var insole_data = [0,0,0]
            this.props.actions.readInsoleData(insole_data)
        } else {
            this.props.actions.startReadInsoleData()

            // TODO 成功后
            // this.props.actions.startReadRightInsoleData()
        }

    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentDidUpdate () {
        if (!this.props.device_data.uuid) {//断开成功
            this.props.navigation.goBack()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        压力数据：{this.props.device_data.insoleDataStr || '--'}
                    </Text>
                    <TouchableHighlight
                        activeOpacity={Theme.active.opacity}
                        underlayColor='transparent'
                        style={styles.shadow_btn}
                        onPress={this.handleInsoleDatas}>

                        <View>
                            <Text style={[styles.text, styles.title]}>
                                {this.props.device_data.isReadingInsoleData?'停止':'开始'}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        另只压力数据：{this.props.device_data.other_insoleDataStr || '--'}
                    </Text>
                </View>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        版本：{this.props.device_data.version || '--'}
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
                        批次：{this.props.device_data.batch || '--'}
                    </Text>

                    <TouchableHighlight
                        activeOpacity={Theme.active.opacity}
                        underlayColor='transparent'
                        style={styles.shadow_btn}
                        onPress={this.handleBatch}>

                        <View>
                            <Text style={[styles.text, styles.title]}>
                                读取
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        电量：{this.props.device_data.voltage || '--'}
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
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        步数：{this.props.device_data.step || '--'}
                    </Text>

                    <TouchableHighlight
                        activeOpacity={Theme.active.opacity}
                        underlayColor='transparent'
                        style={styles.shadow_btn}
                        onPress={this.handleStep}>

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
