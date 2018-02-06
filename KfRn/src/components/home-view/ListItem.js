import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import {Theme, BasicStyle} from '../../styles';

class ListItem extends Component {
    handleConnect = ()=>{
        this.props.actions.startDeviceConnect(this.props.data.uuid);
    }
    render() {
        return (
            <View style={[styles.container, {borderBottomWidth: this.props.isLast?0:1}]}>
                <TouchableHighlight
                    activeOpacity={Theme.active.opacity}
                    underlayColor='transparent'
                    style={styles.body}
                    onPress={this.handleConnect}>
                    <Text style={BasicStyle.text}>{this.props.data.name}</Text>
                </TouchableHighlight>
                <Text style={styles.timer}>{this.props.data.rssi}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Theme.color.brown
    },
    body: {
        flex: 1,
        padding: 15,
    },
    btnIcon: {
        width: 24,
        height: 24
    },
    timer: {
        fontSize: 12,
        fontStyle: 'italic'
    }
});

export default ListItem;
