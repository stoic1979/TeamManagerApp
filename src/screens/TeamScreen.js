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


class TeamScreen extends Component {
    static navigationOptions = {
        title: "My Team"
    };

    render() {

        console.log("-- TeamScreen render() :: username: " + this.props.username );
        console.log("-- TeamScreen render() :: token: " + this.props.token );

        setToken(this.props.token);

        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Invite Team Member
                </Text>
                <TextInput
                    placeholder='Email' 
                />
                <View style={{ height: 10 }} />
                <Button
                    title="Invite"
                    onPress={
                        () => {
                            this.props.navigation.navigate("Team");
                        }
                     }
                />

            </View>
        );
    }
}//TeamScreen

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
 
export default connect(mapStateToProps, mapDispatchToProps)(TeamScreen);