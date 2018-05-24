/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import HomeComponent from './HomeComponent';
import InfoPageComponent from './InfoPageComponent';
import CoolPageComponent from './CoolPageComponent';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { reducer } from './reducer/reducer';

const store = createStore(reducer);

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeComponent
  },
  CoolPage: {
    screen: CoolPageComponent
  }
});

const Tabs = createBottomTabNavigator({
  Main: {
    screen: HomeStack
  },
  InfoPage: {
    screen: InfoPageComponent
  }
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
}
