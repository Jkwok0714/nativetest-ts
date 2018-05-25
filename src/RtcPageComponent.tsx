import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button
} from 'react-native';
import { PORT_NUMBER, STUN_SERVER, MAX_MESSAGE } from './constants/index';
import { connect } from 'react-redux';
import axios from 'axios';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { globalStyles } from './styles';
import { connectSocket, cancelMessage, setChannelListeners } from './helpers/index';
import { addFlag } from './action/action';

import WebRTC from 'react-native-webrtc';
const {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia
} = WebRTC;

// IP of the machine running the signalling servers
const localIP = '192.168.168.201';
const socketPort = 3000;
const SOCKET_URL = `wss://${localIP}:${socketPort}`;

const iceConfig = {
    iceServers: [{ url: STUN_SERVER }]
};

class RtcPageComponent extends Component {
  static navigationOptions = {
    title: 'wRTC',
    tabBarIcon: <Ionicons name={'ios-bug'} size={25} color={'#54bc9c'} />
  };

  state = {
      ownPeer: '',
      otherPeer: '',
      message: '',
      loggedIn: undefined,
      connectedTo: '',
      messages: [],
      localStream: undefined,
      remoteStream: undefined,
      userList: []
  };

  connection = undefined;
  connectedUser = undefined;
  rtcConnection = undefined;
  dataChannel = undefined;
  stream = undefined;

  componentDidMount () {
    // this.connection = openSocket(SOCKET_URL);
    this.connection = new WebSocket(SOCKET_URL);
    this.applyListenersToSocket(this.connection);
  }

  render () {
    const { loggedIn, userList, connectedTo, messages } = this.state;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.welcome}>
          The WebRTC Page
        </Text>
        {!loggedIn ? (
          <View>
            <Text style={globalStyles.instructions}>Not logged in</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={(text) => this.setState({ ownPeer: text })}
              value={this.state.ownPeer}
            />
            <Button
              title={'Login'}
              onPress={this.handleLogin}
            />
          </View>
        ) : (
          <View>
            <Text style={globalStyles.instructions}>Logged in as {this.state.ownPeer}{connectedTo ? `, and connected to ${connectedTo}` : ''}</Text>
            {connectedTo ? (
              <View>
                <View style={globalStyles.chatBox}>
                  {messages.map(msg => <Text key={msg.message} style={globalStyles.chatText}>{`${msg.sender}: ${msg.message}`}</Text>)}
                </View>
              </View>
            ) : (
              <View>
                <TextInput
                  style={globalStyles.input}
                  onChangeText={(text) => this.setState({ otherPeer: text })}
                  value={this.state.otherPeer}
                />
                <Button
                  title={'Connect'}
                  onPress={this.handleConnect}
                />
                <View>
                  {userList.map(user => <Text onPress={() => this.handleSetOtherPeer(user)} key={user}>{user}</Text>)}
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  applyListenersToSocket (connection) {
      // Respond to socket events
      connection.onmessage = (message) => {
          // console.log('Socket got message:', message.data);
          let data;

          try {
              data = JSON.parse(message.data);
          } catch (e) {
              console.error('Invalid JSON:', message.data);
              data = {};
          }

          switch (data.type) {
            case 'login':
              this.onLogin(data.success);
              break;
            case 'offer':
              this.onOffer(data.offer, data.name);
              break;
            case 'answer':
              this.onAnswer(data.answer);
              break;
            case 'candidate':
              this.onCandidate(data.candidate);
              break;
            case 'instantMessage':
              this.onInstantMessage(data.message);
              break;
            case 'serverMessage':
              this.displayMessage({ sender: 'Isaac Serverdown', message: data.message });
              break;
            case 'leave':
              this.onLeave();
              break;
            case 'userList':
              this.onUserList(data.users);
              break;
            default:
              // console.error("You lose.");
              break;
          }
      };
  }

  changeValue = (value, e) => {
      // e.target.value;
      this.setState({ [value]: e.target.value });
  }

  handleLogin = () => {
      const { ownPeer } = this.state;

      if (ownPeer.trim().length > 0) {
          this.send({
              type: 'login',
              name: ownPeer
          })
      }
  }

  handleConnect = () => {
      let otherUser = this.state.otherPeer;
      this.connectedUser = otherUser;

      if (otherUser.trim().length > 0) {
          // Create an offer if username exists
          this.rtcConnection.createOffer((offer) => {
              console.log('Creating RTC offer');
              this.send({ type: 'offer', offer: offer });
              this.rtcConnection.setLocalDescription(offer);
          }, err => window.alert('An error occured creating an offer', err));
      }
  }

  send = (message) => {
      if (this.connectedUser) {
          message.name = this.connectedUser;
      }

      this.connection.send(JSON.stringify(message));
  }

  onUserList = (userList) => {
      this.setState({ userList: JSON.parse(userList) });
  }

  onLogin = (success) => {
      if (!success) {
          // window.alert('Username login failed.');
          return;
      }
      // const isFront = true;
      // MediaStreamTrack.getSources()
      // .then(sources => {
      //   let videoSourceId;
      //   for (let i = 0; i < sourceInfos.length; i++) {
      //     const sourceInfo = sourceInfos[i];
      //     if (sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
      //       videoSourceId = sourceInfo.id;
      //     }
      //   }
      //   return getUserMedia({ video: false, audio: true });
      // })
      // .then((stream) => {
          // this.stream = stream;

          // Set local video source
          // this.setState({ localStream: stream });

          let rtcConnection = new RTCPeerConnection(iceConfig);

          // Attach stream listening and behavior for getting remote stream
          // rtcConnection.addStream(stream);
          rtcConnection.onaddstream = (e) => {
              // console.log('InAddStream for Peer Connection', e);
              this.setState({ remoteStream: e.stream });
          }

          // Configure ICE handling and inform other connections through socket when it's found
          rtcConnection.onicecandidate = (e) => {
              if (e.candidate) {
                  this.send({
                      type: 'candidate',
                      candidate: e.candidate
                  });
              }
          };

          this.rtcConnection = rtcConnection;
          // console.log('Created peer connection object', rtcConnection);
          this.setState({ loggedIn: this.state.ownPeer });
          // this.props.loginChange(true);

          // Establish data channel
          this.openDataChannel();
      // }).catch(err => console.error('Getusermedia error', err));

  }

  // For when user is being called
  onOffer (offer, name) {
      this.connectedUser = name;
      this.rtcConnection.setRemoteDescription(new RTCSessionDescription(offer));

      // console.log('onOffer name', name);

      this.rtcConnection.createAnswer((answer) => {
          this.rtcConnection.setLocalDescription(answer);

          this.send({
              type: 'answer',
              answer: answer
          });

          this.setState({ connectedTo: name });
          this.rtcConnection.ondatachannel = e => setChannelListeners(e.channel, this);
      }, err => window.alert('Error in handling an offer', err));
  }

  // For when a local user's offer is accepted
  onAnswer (answer) {
      this.setState({ connectedTo: this.state.otherPeer });
      this.rtcConnection.setRemoteDescription(new RTCSessionDescription(answer));
      this.rtcConnection.ondatachannel = e => setChannelListeners(e.channel, this);
  }

  onCandidate (candidate) {
      this.rtcConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  onInstantMessage (message) {
      window.alert(message);
  }

  onLeave () {
      this.connectedUser = undefined;
      this.rtcConnection.close();
      this.rtcConnection.onicecandidate = undefined;
      this.rtcConnection.onaddstream = undefined;

      this.setState({ remoteStream: undefined, otherPeer: '' });
  }

  handleMessage = () => {
      // this.send({
      //     type: 'instantMessage',
      //     message: this.state.message
      // });

      try {
          let messageObj = { sender: this.state.ownPeer, message: this.state.message };
          this.dataChannel.send(JSON.stringify(messageObj));
          this.displayMessage(messageObj);
      } catch (e) {
          console.error('Error sending thru data channel', e.message ? e.message : e);
      }
      this.setState({ message: '' });
  }

  openDataChannel () {
      let dataChannelOptions = { reliable: true };

      console.log('%cOpening data channel', 'color: green');

      this.dataChannel = this.rtcConnection.createDataChannel('rtcDataChannel', dataChannelOptions);

      setChannelListeners(this.dataChannel, this);
  }

  displayMessage = (message) => {
      let newMessages = this.state.messages.slice(0);
      newMessages.push(message);
      if (newMessages.length > MAX_MESSAGE) newMessages.shift();
      this.setState({ messages: newMessages });
  }

  handleSetOtherPeer = (name) => {
      if (name === this.state.loggedIn) return;
      this.setState({ otherPeer: name });
  }
}

export default RtcPageComponent;
