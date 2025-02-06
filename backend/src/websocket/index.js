const WebSocket = require('ws');
// import { broadcastMessage } from './utils'

const broadcastMessage = (wss, message) => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  })
}

function initWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      message = JSON.parse(message);
      switch (message.event) {
        case 'message':
          broadcastMessage(wss, message)
          break;
        case 'connection':
          broadcastMessage(wss, message)
          break;
        case 'disconnect':
          broadcastMessage(wss, message)
          break;
      }
    })

    // ws.on('message', (message) => {
    //   console.log('Received message:', JSON.parse(message));
    //
    //   // Отправка ответа обратно клиенту
    //   ws.send(`You sent: ${message}`);
    // });
    //
    // ws.on('close', () => {
    //   console.log('WebSocket connection closed');
    // });
  });

  return wss;
}

module.exports = initWebSocketServer;