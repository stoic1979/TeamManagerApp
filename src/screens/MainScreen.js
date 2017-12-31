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

        console.log("-- MainScreen render() :: state: " + JSON.stringify(this.state) );


        return (
            <View>
                <Text>Welcome to React Navigation</Text>
            </View>
        );
    }
}//MainScreen

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);