const express = require('express');
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const {users} = require('./data')

const {verifyUsersMiddleware} = require('./utils')
const usersRouter = express.Router();


usersRouter.get('/users', verifyUsersMiddleware, (req, res) => {
  res.status(200).send({users: {...users}});
})

usersRouter.get('/user/:id', verifyUsersMiddleware, (req, res) => {
  let param = req.params.id
  console.log(param)
  res.status(200).send('HELLO')
})

module.exports = usersRouter;