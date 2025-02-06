const broadcastMessage = (wss, message) => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  })
}

module.exports = {
  broadcastMessage,
};