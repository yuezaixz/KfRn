import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    StyleSheet,
    View
} from 'react-native';
import {
    Header,
    Main,
    Footer,
} from '../components/home-view';
import Actions from '../actions';

class HomeView extends Component {
    constructor(props){
        super(props);
        this.state = {isVisible: true}
    }
    componentDidMount(){
        // this.currentRoute = this.props.navigator.navigationContext.currentRoute;
        // this.bindEvents();

        //todo: 蓝牙开始搜索
        setTimeout(() => {this.props.actions.startSearchDevice()}, 500)
    }
    componentWillUnmount(){
        this.props.actions.stopSearchDevice()
        // this.unBindEvents();
    }
    bindEvents = ()=>{
        // this.willFocusSubscription  = this.props.navigator.navigationContext.addListener('willfocus', (event) => {
        //     if (this.currentRoute !== event.data.route) {//切换会当前页面，开始搜索，列表显示
        //         this.setState({isVisible: false});
        //     }
        // });
        // this.didFocusSubscription  = this.props.navigator.navigationContext.addListener('didfocus', (event) => {
        //     if (this.currentRoute === event.data.route) {
        //         this.setState({isVisible: true});
        //     }
        // });
    }
    unBindEvents = ()=>{
        // this.willFocusSubscription.remove();
        // this.didFocusSubscription.remove();
    }
    render() {
        return (
            <View style={styles.container}>
                <Header {...this.props}/>
                <Main {...this.props} isVisible={this.state.isVisible}/>
                <Footer {...this.props}/>
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

