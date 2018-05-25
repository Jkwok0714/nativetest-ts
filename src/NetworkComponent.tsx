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
import { connectSocket, cancelMessage } from './helpers/index';
import { addFlag } from './action/action';

const LOCATION_URL = 'https://dev.flowapp.com/location';

class NetworkComponent extends Component {
  static navigationOptions = {
    title: 'Network Page'
  };

  public state = {
    location: '',
    message: undefined
  }

  componentWillMount () {
      axios.get(LOCATION_URL).then(res => {
        this.setState({location: res.data.location });
      }).catch(err => {
        this.setState({ location: `Errorlands: ${JSON.stringify(err)}` })
      });

      connectSocket('hello', (reply) => {
        this.setState({ message: reply });
      });
  }

  componentWillUnmount () {
    cancelMessage();
  }

  render () {
    const { location, message } = this.state;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.welcome}>
          The Network Page
        </Text>
        <Text style={globalStyles.instructions}>Seems you are in.... {location}</Text>
        {message && <Text style={globalStyles.instructions}>There is a message: {message}</Text>}
      </View>
    );
  }
}

export default NetworkComponent;
