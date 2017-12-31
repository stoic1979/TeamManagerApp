import React, { Component } from "react";
import { Text } from "react-native";
import { Provider, connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";


import Routes from "./config/routes"

import getStore from "./store";


/*
const AppNavigator = StackNavigator(Routes, {
    navigationOptions: {
        title: ({ state }) => {
            if (state.params) {
                return `${state.params.title}`;
            }
        }
    }
});
*/

const AppNavigator = StackNavigator(Routes);

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

connect(state => ({
    nav: state.nav
}))
class AppWithNavigationState extends Component {
    render() {

    	console.log("-- AppWithNavigationState render() --");

        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const store = getStore(navReducer);

//export default 
function App1() {
    return (
        <Provider store={store}>
            <AppWithNavigationState />
        </Provider>
    );
}


var App = AppNavigator;
export default App;