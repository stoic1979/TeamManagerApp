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

class ProjectsScreen extends Component {

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
            renderRow={(rowData) => <Text>{rowData.title}</Text>}
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
      //FiXME
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen);