import React, { Component } from 'react';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator
} from 'react-native';

export default class MainScreen extends Component {
    static navigationOptions = {
        title: "Welcome"
    };

    render() {
        return (
            <View>
                <Text>Welcome to React Navigation</Text>
            </View>
        );
    }
}