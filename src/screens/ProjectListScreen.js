import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Image,
    StyleSheet,
    ActivityIndicator,
    ListView
} from 'react-native';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectListScreen extends Component {

    static navigationOptions = {
        title: "Projects"
    };

    //-------------------------
    // constructor
    //-------------------------
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoggingIn: false,
            message: ''
        }

        this.showProjectScreen = this.showProjectScreen.bind(this);
    }

    showProjectScreen(projectId) {

      console.log("+++++++++++++++++++++>>> projectId: " + projectId);

      this.props.navigation.navigate("Project", {projectId: projectId})
    }

    //-------------------------
    // render
    //-------------------------
    render() {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var dataSource = ds.cloneWithRows(this.props.projects);
      return (
          <ListView
            dataSource={dataSource}
            renderSeparator = {this.ListViewItemSeparator}
            renderRow={
              (rowData) => 
                <View style={{ flex: 1, flexDirection: 'row', margin: 10}}>
                  <Image source={require('../images/project.png')} style={{width: 40, height: 40}}/>
                  <Text 
                  style={styles.textViewContainer}
                  onPress = { () => this.showProjectScreen(rowData._id) } 
                  >{rowData.title}</Text>
                </View>   
            }
          />
      )//return
    }//render
    
}//ProjectListScreen


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        projects: state.projects
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
      //FiXME
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
 
export default connect(mapStateToProps, mapDispatchToProps)(ProjectListScreen);