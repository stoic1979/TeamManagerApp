import React from 'react';
import {Text,TextInput,View,Button} from 'react-native';
import {connect} from 'react-redux';

import CustomButton from '../components/CustomButton';

class AddProjectScreen extends React.Component{
	 static navigationOptions = {
        title: "Add new Project"
    };
    //---------------------
    // constructor
    //--------------------
		constructor(props){
			super(props);
			this.state={
				title:'',
				description:''
			}
			this._addproject = this._addproject.bind(this);
		}


		_addproject(){
			console.log(this.state);
			var params={
				title: this.state.title,
				description: this.state.description,
				token: this.props.token
			}
				console.log('---',this.props.token);
			//-----------------------------
			// composing form body
			//-----------------------------
			var formBody = [];
        for (var property in params) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(params[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log("-- formBody: " + formBody);

        //------------------------
        //  sending data to API
        //------------------------


        fetch("https://teammanager9.herokuapp.com/projects/add", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          })
          .then((response) => response.json())
          .then((response) => {
          	console.log('-----',response);
            }
            )
      }

	render(){
		return(
		<View>
			<TextInput
            ref={component => this._title = component}
            placeholder='Title' 
            onChangeText={(title) => this.setState({title})}
      />
      <TextInput
            ref={component => this._description = component}
            placeholder='Description' 
            onChangeText={(description) => this.setState({description})}
      />
     <CustomButton 
            onPress={this._addproject}
            title="Add Project"
                />
		</View>
      );//return
	}//render
}//AddProjectScreen

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username,
        token: state.auth.token
    };
}


export default connect(mapStateToProps)(AddProjectScreen);