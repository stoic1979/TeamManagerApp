import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator
} from 'react-native';

//export default class LoginScreen extends Component {

const LoginScreen = props => (
    <View>
        <Button
            title="Log In"
            onPress={() => {
                props.navigation.navigate("Main");
            }}
        />
    </View>
);

export default LoginScreen;