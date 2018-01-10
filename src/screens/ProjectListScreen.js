import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Image,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    ListView
} from 'react-native';

import Moment from 'moment';

import {issueActions} from '../actions';

import CustomButton from '../components/CustomButton';

import React, { Component } from 'react';

import { connect } from 'react-redux';

class ProjectListScreen extends Component {

  changeDateFormat(value){

    Moment.locale('en');
    var dt = value;
    return(<Text> {Moment(dt).format('d MMM YYYY')} </Text>);

  }


    static navigationOptions = {
        title: "Projects"
    };

    //-------------------------
    // constructor
    //-------------------------
    constructor(props) {
        super(props);

        this.showProjectScreen = this.showProjectScreen.bind(this);
        this.addproject = this.addproject.bind(this);
    }

    addproject(){
      this.props.navigation.navigate("AddProject");
    }

    showProjectScreen(project) {

      console.log("[ProjectListScreen] showProjectScreen () - project: " + JSON.stringify(project));

      this.props.getAllIssues(this.props.token, project._id);
      this.props.navigation.navigate("Project", {project: project})
    }

    

    //-------------------------
    // render
    //-------------------------
    render() {
      console.log("[ProjectListScreen] token: " + JSON.stringify(this.props.token));

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var dataSource = ds.cloneWithRows(this.props.projects);
      return (
        <View>
        <CustomButton
            title='Add Project+'
            onPress={this.addproject}
        />
          <ListView
            dataSource={dataSource}
            renderRow={
              (rowData,sectionID,rowID,highlightRow) => 
                <View style={{ flex: 1, flexDirection: 'row'}}>
                  <Image source={require('../images/project.png')} style={{width: 30, height: 30}}/>
                  <Text style={{fontSize:30,color:'#1a9187'}}>{parseInt(rowID)+1}</Text>
                  <Text 
                    style={styles.textViewContainer}
                    onPress = { () => this.showProjectScreen(rowData)} 
                  >{rowData.title}</Text>
                  <Text style={{fontSize:20,color:'#1a9187'}} >{this.changeDateFormat(rowData.created_at)}</Text>
                </View>
            }
          />
        </View>  
      )//return
    }//render
    
}//ProjectListScreen


const mapStateToProps = (state, ownProps) => {


    console.log("SSSSSSSSSSSSSS state: " + JSON.stringify(state));


    return {
        isLoggedIn: state.auth.isLoggedIn,
        projects: state.projects,
        token: state.auth.token
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
      getAllIssues: (token, project_id) => { dispatch(issueActions.getAll(token, project_id)); }
    }
}

const styles = StyleSheet.create({
  textViewContainer: {
    textAlignVertical: 'center',
    width: '50%',
    fontSize: 15,
    color: '#146C80',
    justifyContent: 'center',
    marginLeft: 10,
  }

});
 
export default connect(mapStateToProps, mapDispatchToProps)(ProjectListScreen);