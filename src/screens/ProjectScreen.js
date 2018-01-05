import React, { Component } from 'react';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Image,
    StyleSheet,
    ListView,
    ActivityIndicator
} from 'react-native';

import CustomButton from '../components/CustomButton';

import { connect } from 'react-redux';

import {projectActions} from '../actions';

import {setToken} from "../prefs";


class ProjectScreen extends Component {
    static navigationOptions = {
        title: "Project"
    };


    showIssueScreen(issue) {

      console.log("[ProjectScreen] showIssueScreen () - issue: " + JSON.stringify(issue));

      //this.props.getAllIssues(this.props.token, project._id);
      //this.props.navigation.navigate("Project", {project: project})
    }

    render() {

        console.log("-- ProjectScreen render() :: username: " + this.props.username );
        console.log("-- ProjectScreen render() :: token: " + this.props.token );

        setToken(this.props.token);

        console.log("++++++++++ ProjectScreen +++++++++++>>> projectId: " + JSON.stringify(this.props.navigation.state.params.project) );

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        var dataSource = ds.cloneWithRows(this.props.issues);
        
        return (
            <View style={{padding: 20}}>
                <Text>{this.props.navigation.state.params.project.title}</Text>
                <View style={{ height: 10 }} />
                <CustomButton
                    title="Add Issue"
                    onPress={
                         () => {
                            this.props.getAllProjects(this.props.token);
                            this.props.navigation.navigate("AddIssue");
                        }
                     }
                    >
                    <Image source={require('../images/project.png')} style={{width: 40, height: 40}} />
                </CustomButton>
                <View style={{ height: 10 }} />
                <ListView
                    dataSource={dataSource}
                    renderRow={
                    (rowData) => 
                    <View style={{ flex: 1, flexDirection: 'row', margin: 10}}>
                    <Image source={require('../images/project.png')} style={{width: 40, height: 40}}/>
                    <Text 
                        style={styles.textViewContainer}
                        onPress = { () => this.showIssueScreen(rowData) } 
                    >{rowData.summary}</Text>
                </View>   
            }
          />

            </View>
        );
    }
}//ProjectScreen

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username,        
        issues: state.issues,
        token: state.auth.token
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); },
        getAllProjects: (token) => { dispatch(projectActions.getAll(token)); }
    }
}

const styles = StyleSheet.create({
  textViewContainer: {
    textAlignVertical: 'center',
    width: '70%',
    fontSize: 15,
    color: '#146C80',
    justifyContent: 'center',
    marginLeft: 10,
  }

});
 
export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen);