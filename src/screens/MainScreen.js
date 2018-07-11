import React, { Component } from 'react';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Image,
    ActivityIndicator,
    StyleSheet,
    BackHandler
} from 'react-native';

import {TabNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';

import ProjectListScreen from '../screens/ProjectListScreen';
import TeamScreen from '../screens/TeamScreen';
import ReportsScreen from '../screens/ReportsScreen';
import RNExitApp from 'react-native-exit-app';

import { connect } from 'react-redux';
import {projectActions} from '../actions';
import {setToken} from "../prefs";
import GlobalStyle from '../config/style';
import CustomButton from '../components/CustomButton'
import ImageButton from '../components/ImageButton'


class MainScreen extends Component {
    static navigationOptions = {
        title: "Dashboard",

          headerLeft: <Text onPress={() => 
          this.props.navigation.navigate('DrawerOpen')}>Menu</Text>
    };

    //----------------------
    // componentDidMount
    //----------------------
    
    render() {
        this.props.getAllProjects(this.props.token);


        const tabs = {
              Projects: {screen: ProjectListScreen},
              Report: {screen: ReportsScreen},
              Team: {screen: TeamScreen}

        };

        const MyTabNavigator=TabNavigator(tabs, {tabBarPosition:'bottom'});

        const MyDrawerNavigator=DrawerNavigator(tabs);


        console.log("-- MainScreen render() :: email: " + this.props.email );
        console.log("-- MainScreen render() :: token: " + this.props.token );

        setToken(this.props.token);

        return (
            <View>
                <MyDrawerNavigator/>
                <MyTabNavigator/>
            </View>
        );//return

    }//render

}//MainScreen

const mapStateToProps = (state, ownProps) => {
    return {
        email: state.auth.email,
        token: state.auth.token
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); },
        getAllProjects: (token) => { dispatch(projectActions.getAll(token)); },
        getAllMembers: (token) =>{ dispatch(teamMemberActions.getAll(token)); }
    }
}

const styles = {
  btnColor: '#146C80',

  container: {
    justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,

    },

};
 
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
