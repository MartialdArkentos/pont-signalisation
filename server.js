const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Diffuser le message à tous les clients sauf l'expéditeur
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Serveur WebSocket en écoute sur le port ${port}`);
});
