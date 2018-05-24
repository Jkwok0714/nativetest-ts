import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

import { globalStyles } from './styles';

import { addFlag } from './action/action';

class InfoPageComponent extends Component {
  static navigationOptions = {
    title: 'Info'
  };

  render () {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.welcome}>Badapp 0.0.1</Text>
        <Text style={globalStyles.instructions}>This is a bad app that doesn't do very much.</Text>
      </View>
    );
  }
}

export default InfoPageComponent;
