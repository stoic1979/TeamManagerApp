/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { StackNavigator } from "react-navigation";
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';

const App = StackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen }
});

export default App;