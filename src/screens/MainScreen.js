import React, { Component } from 'react';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Image,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

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

    render() {

        console.log("-- MainScreen render() :: username: " + this.props.username );
        console.log("-- MainScreen render() :: token: " + this.props.token );

        setToken(this.props.token);

        return (
            <View style={GlobalStyle.container}>
                <CustomButton
                    title="Projects"
                    onPress={
                         () => {
                            this.props.getAllProjects(this.props.token);
                            this.props.navigation.navigate("ProjectList");
                        }
                     }
                    />
                
                <View style={{ height: 10 }} />
                <CustomButton
                    title="My Team"
                    onPress={
                        () => {
                            this.props.navigation.navigate("Team");
                        }
                     }
                />
                <View style={{ height: 10 }} />
                <CustomButton
                    title="Reports"
                    onPress={
                        () => {
                            this.props.navigation.navigate("Reports");
                        }
                     }
                />

                <View style={{ height: 10 }} />    

                <CustomButton 
                    title="Click Me"
                    onPress={
                        () => {
                            this.props.navigation.navigate("Reports");
                        }
                     }
                />
                <View style={{ height: 10 }} />    
                <ImageButton 
                    title="Click Me"
                    onPress={
                        () => {
                            this.props.navigation.navigate("Reports");
                        }
                     }
                />

            </View>
        );
    }
}//MainScreen

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

const styles = {
  btnColor: '#146C80'

};
 
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);