import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import ListItem from './ListItem';

class Main extends Component {
    renderList  = () =>{
        const { home_data } = this.props;
        if(!home_data || !home_data.data){ return null}
        return home_data.device_list.map((item, idx) => {
            return <ListItem {...this.props}
                             name={item.name}
                             uuid={item.uuid}
                             rssi={item.rssi}
                             data={item}
                             isLast={idx==todos.length-1}/>;
        });
    }
    renderLoading = () => {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderLoading()}
                <ScrollView style={styles.list}>
                    {this.renderList()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        paddingTop: 10,
        alignItems: 'center'
    },
    loadingText: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    list: {
        flex: 1,
        padding: 20
    }
});

export default Main;
