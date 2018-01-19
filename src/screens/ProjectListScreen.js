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


  //--------------------
  // changeDateFormat
  //--------------------

  changeDateFormat(value){

    Moment.locale('en');
    var dt = value;
    return(<Text> {Moment(dt).format('YYYY/MM/d')} </Text>);

  }


    static navigationOptions = {
        title: "Projects"
    };

    //-------------------------
    // constructor
    //-------------------------
      constructor(props){
        super(props);
        this.addproject=this.addproject.bind(this);
        this.showProjectScreen=this.showProjectScreen.bind(this);
      }


    //---------------------------
    // add Project
    //---------------------------
    addproject(){
      this.props.navigation.navigate("AddProject");
    }


    //--------------------------
    // showProjectScreen
    //--------------------------

    showProjectScreen(rowData) {

      console.log("[ProjectListScreen] showProjectScreen () - project: " + JSON.stringify(rowData));

      this.props.getAllIssues(this.props.token, rowData._id);
      this.props.navigation.navigate("Project", {project: rowData})
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
                <View style={{ margin: 6, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                  <Text style={{fontSize:20, marginLeft: 10,color:'#1a9187'}}>{parseInt(rowID)+1}</Text>
                  <Image source={require('../images/project.png')} style={{marginLeft: 10, width: 30, height: 30}}/>
                  <Text 
                    style={styles.textViewContainer}
                    onPress = { () => this.showProjectScreen(rowData)} 
                  >{rowData.title}</Text>
                  <Text style={{fontSize:18,color:'#1a9187'}} >{this.changeDateFormat(rowData.created_at)}</Text>
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
    fontSize: 18,
    color: '#146C80',
    justifyContent: 'center',
    marginLeft: 12,
  }

});
 
export default connect(mapStateToProps, mapDispatchToProps)(ProjectListScreen);