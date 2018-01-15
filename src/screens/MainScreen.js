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
import RNExitApp from 'react-native-exit-app';

import { connect } from 'react-redux';
import {projectActions} from '../actions';
import {setToken} from "../prefs";
import GlobalStyle from '../config/style';
import CustomButton from '../components/CustomButton'
import ImageButton from '../components/ImageButton'


class MainScreen extends Component {
    static navigationOptions = {
        title: "Dashboard"
    };

    //----------------------
    // componentDidMount
    //----------------------

    componentDidMount(){
        BackHandler.addEventListener('backPress'),()=>{
            RNExitApp.exitApp();
        }
    }

    render() {

        console.log("-- MainScreen render() :: email: " + this.props.email );
        console.log("-- MainScreen render() :: token: " + this.props.token );

        setToken(this.props.token);

        return (
            <View style={styles.container}>
                <ImageButton
                    title="Projects"
                    img={require('../images/icon.png')}
                    onPress={
                         () => {
                            this.props.getAllProjects(this.props.token);
                            this.props.navigation.navigate("ProjectList");
                        }
                     }
                    />
                
                <View style={{ height: 10 }} />
                <ImageButton
                    title="My Team"
                    img={require('../images/icon.png')}
                    onPress={
                        () => {
                            this.props.getAll
                            this.props.navigation.navigate("Team");
                        }
                     }
                />
                <View style={{ height: 10 }} />
                <ImageButton
                    title="Reports"
                    img={require('../images/icon.png')}
                    onPress={
                        () => {
                            this.props.navigation.navigate("Reports");
                        }
                     }
                />

                <View style={{ height: 10 }} />    

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