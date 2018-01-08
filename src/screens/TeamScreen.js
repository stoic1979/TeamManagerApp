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
import {teamMemberActions} from '../actions';

import {setToken} from "../prefs";
import CustomButton from '../components/CustomButton'


class TeamScreen extends Component {

    static navigationOptions = {
        title: "My Team"
    };

    constructor(props) {
        super(props);

        this.state = {
            email: ''
          
        }
        this.addMember = this.addMember.bind(this);
    }

    addMember(){
        console.log("-- addMember --");
        
        console.log(this.state);
        var params={
            email: this.state.email,
              
            token: this.props.token
        }
                console.log('---',this.props.token);
            //-----------------------------
            // composing form body
            //-----------------------------
            var formBody = [];
        for (var property in params) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(params[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log("-- formBody: " + formBody);

        //------------------------
        //  sending data to API
        //------------------------


        fetch("https://teammanager9.herokuapp.com/members/invite_team_member", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          })
          .then((response) => response.json())
          .then((response) => {
            console.log('-----',response);
        }
            )
        
    }

    render() {

      
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
                    ref={component => this._email = component}
                    placeholder='Email'
                    onChangeText={(email)=>this.setState({email})}
                />
                <View style={{ height: 10 }} />
                <CustomButton
                    title="Invite"
                   onPress={this.addMember}
                     
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
        getAllProjects: (token) => { dispatch(projectActions.getAll(token)); },
       
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TeamScreen);