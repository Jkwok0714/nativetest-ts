import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

import { addFlag } from './action/action';

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
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This-sure-is-native Native!
        </Text>
        <Text style={styles.instructions}>
          Filling App.js with loads of junk. Like: {flag}
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#54bc9c'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5
  }
});

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
