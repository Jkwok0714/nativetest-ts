import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class PageComponent extends Component<Props> {
  static navigationOptions = {
    title: 'Pager of the 90s'
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Isn't that cool?!
        </Text>
        <Text style={styles.instructions}>
          Props: { JSON.stringify(this.props) }
        </Text>
        <Text style={styles.instructions}>
          Title: { this.props.navigation.state.params.title }
        </Text>
        <Button
          title='No it is not.'
          onPress={() =>
            navigate('Home', { name: 'A prop maybe?' })
          }
        />
        <Button
          title='Yes it is.'
          onPress={() =>
            navigate('CoolPage', { name: 'A prop maybe?' })
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
