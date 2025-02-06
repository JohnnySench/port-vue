const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const authRouter = require('./src/auth')
const usersRouter = require('./src/employees')
const roomsRouter = require('./src/rooms')
const initWebsocket = require('./src/websocket');

const app = express();
const server = http.createServer(app);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(authRouter)
app.use(usersRouter)
app.use(roomsRouter)

const wss = initWebsocket(server);
const port = 3001;
server.listen(port, () => console.log(`Server started on port ${port}`));