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
import { StackNavigator } from 'react-navigation';

import HomeComponent from './HomeComponent';
import PageComponent from './PageComponent';
import CoolPageComponent from './CoolPageComponent';

type Props = {};
export default App = StackNavigator({
  Home: { screen: HomeComponent },
  Page: { screen: PageComponent },
  CoolPage: { screen: CoolPageComponent }
});
