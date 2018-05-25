import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { globalStyles } from './styles';

import { addFlag } from './action/action';

class InfoPageComponent extends Component {
  static navigationOptions = {
    title: 'Info',
    tabBarIcon: <Ionicons name={'logo-android'} size={25} color={'#54bc9c'} />
  };

  public state = {
    text: ''
  };

  render () {
    const { flag } = this.props;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.welcome}>Badapp 0.0.1</Text>
        <Text style={globalStyles.instructions}>This is a bad app that doesn't do very much.</Text>
        <Text style={globalStyles.instructions}>
          Redux has a flag and it is {flag}.
          {'\n'}Change it?
        </Text>
        <TextInput
          style={globalStyles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          title={'Submit Changes'}
          onPress={() => this.props.addFlag(this.state.text)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    flag: state.flag
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFlag: (flag) => dispatch(addFlag(flag))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPageComponent);
