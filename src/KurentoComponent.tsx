import React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button
} from 'react-native';
import { connect } from 'react-redux';

import kurentoUtils from 'react-native-kurento-utils';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from './styles';

import WebRTC from 'react-native-webrtc';
const {
  RTCView
} = WebRTC;

const ADDRESS = '192.168.37.167:8443';

class KurentoComponent extends Component {
  static navigationOptions = {
    title: 'Kurento',
    tabBarIcon: <Ionicons name={'ios-beer'} size={25} color={'#54bc9c'} />
  };

  state = {
    remoteStream: undefined
  }
  ws = undefined;
  webRtcPeer = undefined;

  componentDidUpdate (newProps) {
    console.log('isFocused:', this.props.navigation.isFocused());
  }

  componentDidMount () {
    console.log(kurentoUtils);
    this.ws = new WebSocket('wss://' + ADDRESS + '/one2many');
    this.addSocketListeners(this.ws);
    // Auto join as a viewer
    console.log(this.ws);
    // this.ws.send('poop');
    // this.generateViewer();
  }

  addSocketListeners () {
    this.ws.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);
      console.log('Get message', parsedMessage);

      switch (parsedMessage.id) {
        case 'message':
          // this.messageResponse(parsedMessage.message);
          break;
        case 'viewerResponse':
          this.viewerResponse(parsedMessage);
          break;
        case 'stopCommunication':
          // this.dispose();
          break;
        case 'iceCandidate':
          this.webRtcPeer.addIceCandidate(parsedMessage.candidate)
          break;
        default:
          console.error('Unrecognized message', parsedMessage);
      }
    }
  }

  generateViewer = () => {
    if (!this.webRtcPeer) {

      let options = {
        remoteVideo: this._rtcView,
        onicecandidate: this.onIceCandidate
      }

      const self = this;
      console.log('Generating viewer');

      this.webRtcPeer = kurentoUtils.WebRtcPeerRecvonly(options, function (err) {
        if (err) return self.onError(err);
        console.log('In Kurentoutil', this);

        this.generateOffer(self.onOfferViewer);
      });
    }
  }

  viewerResponse = (message) => {
    if (message.response !== 'accepted') {
      let errorMsg = message.message ? message.message : 'Unknown error';
      console.log('Call rejected: ' + errorMsg);
      window.alert(errorMsg);
      this.dispose();
    } else {
      console.log('webRtcPeer', this.webRtcPeer, message);
      this.webRtcPeer.processAnswer(message.sdpAnswer);
    }
  }

  onOfferViewer = (err, offer) => {
    if (err) {
      return this.onError(err);
    }

    let message = {
      id: 'viewer',
      sdpOffer: offer
    }

    this.sendMessage(message);
  }

  onIceCandidate = (candidate) => {
    console.log('Get ice candidate');

    let message = {
      id : 'onIceCandidate',
      candidate : candidate
    }
    this.sendMessage(message);
  }

  sendMessage = (message) => {
    let jsonMsg = JSON.stringify(message);
    this.ws.send(jsonMsg);
  }

  stop = () => {
    if (this.webRtcPeer) {
      let message = {
        id: 'stop'
      }

      this.sendMessage(message);
      this.dispose();
    }
  }

  dispose = () => {
    if (this.webRtcPeer) {
      this.webRtcPeer.dispose();
      this.webRtcPeer = undefined;
    }
  }

  onError (err) {
    console.error('ERROR', err);
  }

  render () {
    const { remoteStream } = this.state;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.welcome}>
          Kurento, The Component
        </Text>
        <Button
          title={'Join Kurento'}
          onPress={this.generateViewer}
        />
        <View style={globalStyles.rtcViewContainer}>
          <RTCView ref={component => this._rtcView = component} style={globalStyles.rtcView} />
        </View>}
      </View>
    );
  }
}

export default KurentoComponent;
