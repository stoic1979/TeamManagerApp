import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    ListView
} from 'react-native';

import React, { Component } from 'react';

import { connect } from 'react-redux';

import {login} from '../actions/user.actions';



class ProjectsScreen extends Component {


    static navigationOptions = {
        title: "Projects"
    };


    //-------------------------
    // states
    //-------------------------


    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoggingIn: false,
            message: ''
        }

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };

    }


    render() {
        console.log("------------------------------------------------------------------------------------");
        console.log("---------------------- ProjectsScreenRR render(), projects: " + this.props.projects);

        return (
             <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
            )//return
    }//render
}//ProjectsScreen


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        projects: state.projects
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, token) => { dispatch(login(username, token)); }
        //onSignUp: (username, password) => { dispatch(signup(username, password)); }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen);