import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';

import { addFlag } from './action/action';

import { globalStyles } from './styles';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

class HomeComponent extends Component {
  componentDidMount () {
    const props = this.props;
    setTimeout(() => {
      props.addFlag('UPDATED REDUCKS');
    }, 2000);
  }

  render () {
    const { flag } = this.props;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.welcome}>
          This-sure-is-native Native!
        </Text>
        <Text style={globalStyles.instructions}>
          Filling App.js with loads of junk. Like: {flag}
        </Text>
        <Text style={globalStyles.instructions}>
          {instructions}
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('CoolPage', { coolness: 1 })}
          title='The Cool Page'
        />
        <Button
          onPress={() => this.props.navigation.navigate('CoolPage', { coolness: 10 })}
          title='The Coolest Page'
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
