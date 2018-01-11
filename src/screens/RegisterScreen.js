import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    Picker,
    TextInput,
    View,
    Button,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import CustomButton from '../components/CustomButton';

//--------------------------------------------------------------------
//
//              REGISTER SCREEN
//
//--------------------------------------------------------------------
export default class RegisterScreen extends Component {


    static navigationOptions = {
        title: "TM Register"
    };

    //-----------------
    // constructor
    //-----------------

    constructor(props) {
        super(props);

    //--------------
    // states
    //--------------
    
        this.state = {
            isRegistering: false,
            email: '',
            password: '',
            first_name:'',
            last_name:'',
            role:'MANAGER',
            message:''
        }



    }


	//--------------------------------------------------
	//  function to register user
	//--------------------------------------------------
    _userRegister = () => { 
    	console.log('--User Register--');
        console.log(this.state);
    	this.setState({isRegistering: true, message:''});


    	var params = {
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            role: this.state.role
        };

        
        //--------------------------
        // composing form body
        //--------------------------
        var formBody=[];
        for(var property in params){
        	var encodeKey = encodeURIComponent(property);
        	var encodedValue = encodeURIComponent(params[property]);
        	formBody.push(encodeKey+ "=" + encodedValue);
        }
        formBody=formBody.join("&");
        console.log("--formBody--" + formBody);

        //---------------------------------------
        // sending register request to server
        //---------------------------------------
        var proceed=false;
        fetch('https://teammanager9.herokuapp.com/users/signup', {
        	method: "POST",
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	},
        	body : formBody
        })
		.then((response) => {
            response.json()
        .then((response)=>{
            if(response.success){
            this.setState({message:response.message});
            this.setState({isRegistering: false});
        }else{
            this.setState({message:response.errmsg});
            this.setState({isRegistering: false});
        }
        }
            )
        })
		.done();
    }//UserRegister


    //---------------
    // render
    //---------------

    render() {

        console.log("-- RegisterScreen render(), state: " + JSON.stringify(this.state));

        //-------------------
        // return
        //-------------------
        
        return (
            <View style={{margin:20}}>
                <Text style={{fontSize:20}}>Register</Text>
                <TextInput
                    ref={component => this._email = component}
                    placeholder='Email'
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    autoFocus={true}
                />
                <TextInput
                    ref={component => this._email = component}
                    placeholder='Password'
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />
                <TextInput
                    ref={component => this._first_name = component}
                    placeholder='First Name'
                    value={this.state.first_name}
                    onChangeText={(first_name) => this.setState({first_name})}
                />
                <TextInput
                    ref={component => this._last_name = component}
                    placeholder='Last Name'
                    value={this.state.last_name}
                    onChangeText={(last_name) => this.setState({last_name})}
                />
                <Picker
                    selectedValue={this.state.role}
                    onValueChange={(value)=>this.setState({role:value})}>
                <Picker.Item label="Manager" value="MANAGER" />
                <Picker.Item label="Worker" value="WORKER" />
                </Picker>
                {!!this.state.message && (
                    <Text
                        style={{fontSize: 14, color: 'red', padding: 5}}>
                    {this.state.message}
                    </Text>
                )}
                {this.state.isRegistering && <ActivityIndicator />}
                <Button
                    title='register'
                    disabled={!this.state.email||!this.state.password||!this.state.first_name||!this.state.last_name||!this.state.role}
                    onPress={this._userRegister}
                />
            </View>
        )//return
    }//render
}//RegisterScreen