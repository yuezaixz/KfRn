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

class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.title]}>
                    Podoon康复React-Native Demo
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
    },
    text: {
        color: '#fff'
    },
    title: {
        width: width/2,
        textAlign: 'center',
        fontSize: 60
    }
});

export default Header;
