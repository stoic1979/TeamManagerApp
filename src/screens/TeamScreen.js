import React, { Component } from 'react';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    ListView
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

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var dataSource = ds.cloneWithRows(['Tom', 'Jerry']);

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

                <Text 
                    style={{fontSize: 27}}>
                    Team Members
                </Text>
                <ListView
                    dataSource={dataSource}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
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