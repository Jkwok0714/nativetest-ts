import {
  Dimensions,
  Platform
} from 'react-native';
import openSocket from 'socket.io-client';

// const SOCKET_URL = 'http://localhost:8001';
const SOCKET_URL = Platform.select({
  ios: 'http://localhost:8001',
  android: 'http://10.0.2.2:8001'
});

const socket = openSocket(SOCKET_URL);

const msp = (dim, limit) => {
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
};

export const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

export const isTablet = () => {
    const dim = Dimensions.get('screen');
    return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)));
};

export const connectSocket = (send, cb) => {
  socket.on('message', message => cb(message));
  socket.emit('message', send);
}

export const cancelMessage = () => {
  // socket.on('message', message => cb(message));
  socket.emit('cancelMessage');
}
