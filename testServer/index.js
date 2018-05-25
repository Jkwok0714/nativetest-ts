const PORT = 8001;

let io = require('socket.io').listen(PORT);

console.log('Socket listening on', PORT);

let subscribers = {};

io.on('connection', (client) => {
  client.on('message', (message) => {
    console.log('Got message', message, 'time to spam the client');
    // console.log(client);
    let interv = setInterval(() => {
      client.emit('message', 'You are customer #' + Math.floor(Math.random() * 100) + '!!');
    }, 2000);
    subscribers[client.id] = interv;

    client.on('disconnect', () => clearInterval(interv));
  });

  client.on('cancelMessage', () => {
    console.log('Clearing interval');
    try {
      clearInterval(subscribers[client.id]);
    } catch (e) {
      console.log('Error clearing', e);
    }
  });
});
