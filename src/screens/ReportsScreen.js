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


class ReportsScreen extends Component {
    static navigationOptions = {
        title: "Reports"
    };

    //---------------
    // render
    //---------------

    render() {

        console.log("-- ReportsScreen render() :: username: " + this.props.username );
        console.log("-- ReportsScreen render() :: token: " + this.props.token );

        setToken(this.props.token);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var dataSource = ds.cloneWithRows(['Tom', 'Jerry']);

        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Reports Here
                </Text>
                
            </View>
        );//return
    }//render
}//ReportsScreen

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
 
export default connect(mapStateToProps, mapDispatchToProps)(ReportsScreen);