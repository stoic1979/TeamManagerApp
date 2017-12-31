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

import {projectActions} from '../actions';

import {setToken} from "../prefs";


class MainScreen extends Component {
    static navigationOptions = {
        title: "Welcome"
    };

    render() {

        console.log("-- MainScreen render() :: username: " + this.props.username );
        console.log("-- MainScreen render() :: token: " + this.props.token );

        setToken(this.props.token);

        return (
            <View>
                <Text>Team Manager Dashboard</Text>
                <Button
                    title="Projects"
                    onPress={ () => this.props.getAllProjects(this.props.token) }
                    
                />
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
        onLogout: () => { dispatch(logout()); },
        getAllProjects: (token) => { dispatch(projectActions.getAll(token)); }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);