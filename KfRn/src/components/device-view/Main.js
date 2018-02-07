import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions
} from 'react-native';

let {height, width} = Dimensions.get('window');

class Main extends Component {
    handleVersion = ()=>{
        if (this.props.home_data.isSearching) {
            this.props.actions.stopSearchDevice();
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.title]}>
                    版本：{this.props.device_data.version || '--'}
                </Text>
                <View style={styles.shadow_btn}>
                    <Text style={[styles.text, styles.title]}>
                        读取
                    </Text>
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
        paddingTop:20,
        height: 60,
        height:height-100-80,
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
