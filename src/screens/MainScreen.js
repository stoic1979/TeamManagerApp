import React, { Component } from 'react';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

class MainScreen extends Component {
    static navigationOptions = {
        title: "Welcome"
    };

    render() {

        console.log("-- MainScreen render() :: username: " + this.props.username );
        console.log("-- MainScreen render() :: token: " + this.props.token );


        return (
            <View>
                <Text>Welcome to React Navigation</Text>
            </View>
        );
    }
}//MainScreen

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username,
        token: state.auth.token
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);