import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import { globalStyles } from './styles';
import { isPortrait, isTablet } from './helpers/index';
import { addFlag } from './action/action';

const iSick = require('./img/iSick.png');

class CoolPageComponent extends Component {
  static navigationOptions = {
    title: 'Coolest Page'
  };

  public state = {
    orientation: isPortrait() ? 'portrait' : 'landscape',
    deviceType: isTablet() ? 'tablet' : 'phone'
  }

  componentDidMount () {
    // Add to app level to disable tab navigator if necessary
    Dimensions.addEventListener('change', this.setOrientation);
  }

  setOrientation = () => {
    this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
    });
  }

  componentWillUnmount () {
    // Fix memory leak
    Dimensions.removeEventListener('change', this.setOrientation);
  }

  render () {
    const { coolness } = this.props.navigation.state.params;
    const { orientation, deviceType } = this.state;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.welcome}>
          The Cool Page
        </Text>
        <Text style={globalStyles.instructions}>This is a cool page; cool, right?</Text>
        <Text style={globalStyles.instructions}>There is a coolness factor of {coolness || 0}</Text>
        <Text style={globalStyles.instructions}>So cool that the {deviceType} is in {orientation}</Text>
        <Image style={globalStyles.imageStretch} source={iSick} />
      </View>
    );
  }
}

export default CoolPageComponent;
