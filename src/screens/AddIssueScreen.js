import React from 'react';
import {Text,
        TextInput,
        View,
        Picker,
        Button
  } from 'react-native';
import {connect} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import CustomButton from '../components/CustomButton';

class AddIssueScreen extends React.Component{
	 static navigationOptions = {
        title: "Add new Issue"
    };
    //---------------------
    // constructor
    //--------------------
		constructor(props){
			super(props);
			this.state={
        summary:'',
        description:'',
        assignee:'',
        priority:'',
        type:'',
        status:'',
        start_date:'',
        end_date:'',
        estimated_hours:''
			}
			this._AddIssue = this._AddIssue.bind(this);
		}


		_AddIssue(){
			console.log(this.state);
      console.log(this.props.token);
      var params={
        summary: this.state.summary,
        description: this.state.description,
        assignee: this.state.assignee,
        priority: this.state.priority,
        type: this.state.type,
        status: this.state.status,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        estimated_hours: this.state.estimated_hours,
        token: this.props.token
      }
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
        fetch("https://teammanager9.herokuapp.com/issues/add", {
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
            ref={component => this._summary = component}
            placeholder='Summary' 
            onChangeText={(summary) => this.setState({summary})}
      />
      <TextInput
            ref={component => this._description = component}
            placeholder='Description' 
            onChangeText={(description) => this.setState({description})}
      />
      <Picker
          selectedValue={this.state.assignee}
          onValueChange={(itemValue) => this.setState({assignee: itemValue})}>
              <Picker.Item label="NSK" value="NSK" />
              <Picker.Item label="tom" value="tom" />
      </Picker>
      <Picker
          selectedValue={this.state.priority}
          onValueChange={(itemValue) => this.setState({priority: itemValue})}>
              <Picker.Item label="Blocker" value="BLOCKER" />
              <Picker.Item label="High" value="HIGH" />
              <Picker.Item label="Medium" value="MEDIUM" />
              <Picker.Item label="Low" value="LOW" />
      </Picker>
      <Picker
          selectedValue={this.state.type}
          onValueChange={(itemValue) => this.setState({type: itemValue})}>
              <Picker.Item label="Task" value="TASK" />
              <Picker.Item label="Bug" value="BUG" />
              <Picker.Item label="Enhancement" value="ENHANCEMENT" />
      </Picker>
      <Picker
          selectedValue={this.state.status}
          onValueChange={(itemValue) => this.setState({status: itemValue})}>
              <Picker.Item label="Not Started" value="TASK" />
              <Picker.Item label="Working" value="WORKING" />
              <Picker.Item label="Testing" value="TESTING" />
              <Picker.Item label="Closed" value="CLOSED" />
              <Picker.Item label="Reopened" value="REOPENED" />
      </Picker>
      <TextInput
            ref={component => this._estimated_hours = component}
            placeholder='Estimated Hours' 
            onChangeText={(estimated_hours) => this.setState({estimated_hours})}
      />
      <Text>Start Date</Text>
      <DatePicker 
              date={this.state.start_date}
              onDateChange={(date) => {this.setState({start_date: date})}}
      />
      <Text>End Date</Text>
      <DatePicker 
              date={this.state.end_date}
              onDateChange={(date) => {this.setState({end_date: date})}}
      />
      <TextInput
            ref={component => this._estimated_hours = component}
            placeholder='Estimated Hours' 
            onChangeText={(estimated_hours) => this.setState({estimated_hours})}
      />
      <CustomButton
            onPress={this._AddIssue}
            title="Add Issue"
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


export default connect(mapStateToProps)(AddIssueScreen);