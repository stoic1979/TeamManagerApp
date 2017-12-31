import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator
} from 'react-native';

import React, { Component } from 'react';


export default class LoginScreen extends Component {


    static navigationOptions = {
        title: "TM Login"
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

        this.clearUsername = this.clearUsername.bind(this);
        this.clearPassword = this.clearPassword.bind(this);

    }


    //-----------------------------------------------
    // function to login user
    //-----------------------------------------------
    _userLogin = () => { 



        console.log("-- _userLogin  --");


        this.setState({isLoggingIn: true, message:''});

        var params = {
            username: this.state.username,
            password: this.state.password
        };
        

        //----------------------------------------
        // composing form body
        //----------------------------------------
        var formBody = [];
        for (var property in params) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(params[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log("-- formBody: " + formBody);

        //----------------------------------------
        // sending login request to server]
        // ---------------------------------------
        var proceed = false;
        fetch("https://teammanager9.herokuapp.com/users/login", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          })
          .then((response) => response.json())
          .then((response) => {

            console.log("-- _userLogin :: server resp: " + JSON.stringify(response) );


            if (response.error) this.setState({message: response.message});
            else proceed = true;
          })
          .then(() => {
            this.setState({isLoggingIn: false})
            if (proceed) this.props.navigation.navigate("Main");
          })
          .done();

    }//_userLogin

    clearUsername = () => {
        this._username.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }


    render() {
        console.log("-- LoginScreen render()  --");

        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput
                    ref={component => this._username = component}
                    placeholder='Username' 
                    onChangeText={(username) => this.setState({username})}
                    autoFocus={true}
                    onFocus={this.clearUsername}
                />
                <TextInput 
                    ref={component => this._password = component}
                    placeholder='Password' 
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    onSubmitEditing={this._userLogin}
                />


                {!!this.state.message && (
                    <Text
                        style={{fontSize: 14, color: 'red', padding: 5}}>
                    {this.state.message}
                    </Text>
                )}

                {this.state.isLoggingIn && <ActivityIndicator />}
                
                <View style={{margin:7}} />

                <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
                <Button 
                    disabled={this.state.isLoggingIn||!this.state.username||!this.state.password}
                    onPress={this._userLogin}
                    title="Login"
                />
                <Button
                    title="Register"
                    onPress={ () => this.props.navigation.navigate("Register")}
                    
                />
                </View>
                </ScrollView>
            )//return
    }//render
}//LoginScreen