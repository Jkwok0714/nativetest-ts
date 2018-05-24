import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { globalStyles } from './styles';
import { isPortrait, isTablet } from './helpers/index';
import { addFlag } from './action/action';

const LOCATION_URL = 'https://dev.flowapp.com/location';

class NetworkComponent extends Component {
  static navigationOptions = {
    title: 'Network Page'
  };

  public state = {
    location: ''
  }

  public componentWillMount () {
      axios.get(LOCATION_URL).then(res => {
        this.setState({location: res.data.location });
      }).catch(err => {
        this.setState({ location: `Errorlands: ${JSON.stringify(err)}` })
      });
  }

  render () {
    const { location } = this.state;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.welcome}>
          The Network Page
        </Text>
        <Text style={globalStyles.instructions}>Seems you are in {location}</Text>
      </View>
    );
  }
}

export default NetworkComponent;
