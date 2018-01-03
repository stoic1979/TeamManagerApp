import React, { Component } from 'react';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Image,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import {projectActions} from '../actions';

import {setToken} from "../prefs";


class MainScreen extends Component {
    static navigationOptions = {
        title: "Dashboard"
    };

    render() {

        console.log("-- MainScreen render() :: username: " + this.props.username );
        console.log("-- MainScreen render() :: token: " + this.props.token );

        setToken(this.props.token);

        return (
            <View style={{padding: 20}}>
                <Button
                    title="Projects"
                    onPress={
                         () => {
                            this.props.getAllProjects(this.props.token);
                            this.props.navigation.navigate("Projects");
                        }
                     }
                    >
                    <Image source={require('../images/project.png')} style={{width: 40, height: 40}} />
                </Button>
                <View style={{ height: 10 }} />
                <Button
                    title="My Team"
                    onPress={
                        () => {
                            this.props.navigation.navigate("Team");
                        }
                     }
                />
                <View style={{ height: 10 }} />
                <Button
                    title="Reports"
                    onPress={
                        () => {
                            this.props.navigation.navigate("Reports");
                        }
                     }
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