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

    setLeftValue(point1, point2, point3) {
        return this.refs['leftFoot'].setValue(point1, point2, point3)
    }

    setRightValue(point1, point2, point3) {
        return this.refs['rightFoot'].setValue(point1, point2, point3)
    }

    render() {
        return(
            <View style={styles.container}>
                <SingleFootView ref={'leftFoot'}  isRight={false}/>
                <SingleFootView ref={'rightFoot'} isRight={true} />
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