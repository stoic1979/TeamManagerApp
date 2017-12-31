/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { StackNavigator } from "react-navigation";
import Routes from "./config/routes"

const App = StackNavigator(Routes);

export default App;