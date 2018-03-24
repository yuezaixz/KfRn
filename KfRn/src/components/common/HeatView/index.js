import React, { Component } from 'react';

import {
    StyleSheet,
    Dimensions,
    Text,
    View
} from 'react-native';

import SingleFootView from './SingleFootView'

let {height, width} = Dimensions.get('window');

class HeatView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <SingleFootView isRight={false}/>
                <SingleFootView isRight={true} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 223,
        flexDirection:"row",
    }
});

export default HeatView;