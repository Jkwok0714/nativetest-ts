import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

export default class HomeComponent extends Component<Props> {
  static navigationOptions = {
    title: 'Native React Native the Native'
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This-sure-is-native Native!
        </Text>
        <Text style={styles.instructions}>
          Filling App.js with loads of junk.
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button
          title='Go to some page'
          onPress={() =>
            navigate('Page', { title: '90\'s Pager' })
          }
        />
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
