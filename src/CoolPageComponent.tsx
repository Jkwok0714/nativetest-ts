import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

export default class CoolPageComponent extends Component<Props> {
  static navigationOptions = {
    title: 'Pager of the Late 90s'
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is the coolpage.
        </Text>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('../img/download-1.jpg')}
        />
        <Button
          title='Return'
          onPress={() =>
            navigate('Home', { name: 'A prop maybe?' })
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
    fontSize: 8,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5
  }
});
