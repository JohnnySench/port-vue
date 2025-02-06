const express = require('express');
const {mockRooms} = require('./data')



const roomsRouter = express.Router();

roomsRouter.get('/rooms', (req, res) => {
  res.status(200).send(JSON.stringify(mockRooms));
})

module.exports = roomsRouter;