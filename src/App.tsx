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

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import HomeComponent from './HomeComponent';

import { reducer } from './reducer/reducer';

const store = createStore(reducer);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <HomeComponent />
      </Provider>
    );
  }
}
