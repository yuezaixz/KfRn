import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import {Theme} from "../../styles";

let {height, width} = Dimensions.get('window');

class Main extends Component {
    handleVersion = ()=>{
        console.log(this.props.device_data)
        this.props.actions.startReadVersion(this.props.device_data.uuid, this.props.device_data.serviceUUID, this.props.device_data.writeUUID)
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
                        版本：{this.props.device_data.version || '--'}
                    </Text>
                    <View style={styles.shadow_btn}>
                        <Text style={[styles.text, styles.title]}>
                            读取
                        </Text>
                    </View>
                </View>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        批次：{this.props.device_data.batch || '--'}
                    </Text>
                    <View style={styles.shadow_btn}>
                        <Text style={[styles.text, styles.title]}>
                            读取
                        </Text>
                    </View>
                </View>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        电量：{this.props.device_data.voltage || '--'}
                    </Text>
                    <View style={styles.shadow_btn}>
                        <Text style={[styles.text, styles.title]}>
                            读取
                        </Text>
                    </View>
                </View>
                <View style={styles.insole_info}>
                    <Text style={[styles.text, styles.title]}>
                        步数：{this.props.device_data.step || '--'}
                    </Text>
                    <View style={styles.shadow_btn}>
                        <Text style={[styles.text, styles.title]}>
                            读取
                        </Text>
                    </View>
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
