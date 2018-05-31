import { StyleSheet } from 'react-native';
// import { vw, ch } from 'react-native-viewport-units';

export const globalStyles = StyleSheet.create({
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
  },
  chatBox: {
    backgroundColor: 'white'
  },
  chatText: {
    color: 'gray'
  },
  input: {
    height: 40,
    width: 200,
    padding: 5,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1
  },
  rtcView: {
    width: 400,
    height: 300
  },
  rtcViewContainer: {
    width: '100%'
  },
  imageStretch: {
    flex: 1,
    width: '90%',
    resizeMode: 'contain'
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
