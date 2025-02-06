const express = require('express');
const crypto = require('crypto')
const { passwordSecret, fakeUserJohnn, fakeUserVika } = require('./data')
const { getTokens, refreshTokenAge, verifyAuthorizationMiddleware, verifyRefreshTokenMiddleware } = require('./utils')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const { ROLES } = require('./roles')

const authRouter = express.Router();




// auth
authRouter.post('/login', (req, res) => {
  const { login, password } = req.body;
  const hash = crypto
    .createHmac('sha256', passwordSecret)
    .update(password)
    .digest('hex')

  let answer;
  if (login !== fakeUserJohnn.login && login !== fakeUserVika.login) {
    return res.status(401).send({accessToken: null, error: 'invalid login'});
  }
  if (login === fakeUserJohnn.login) {
    if (hash === fakeUserJohnn.passwordHash) {
      answer = {
        accessToken: null,
        message: `Привет ${fakeUserJohnn.login}`,
        error: null,
      }
    } else {
      answer = {
        accessToken: null,
        message: `Привет ${fakeUserJohnn.login}, но пароль то не верный`,
        error: 'invalid password'
      }
    }
  } else if (login === fakeUserVika.login) {
    if (hash === fakeUserVika.passwordHash) {
      answer = {
        accessToken: '',
        message: `Привет ${fakeUserVika.login}`,
        error: null
      }
    } else {
      answer = {
        accessToken: null,
        message: `Привет ${fakeUserVika.login}, но пароль то не верный`,
        error: 'invalid password'
      }
    }
  } else {
    answer = {
      accessToken: null,
      message: 'Ты кто??'
    }
  }
  const {accessToken, refreshToken} = getTokens(login)
  answer.accessToken = accessToken
  res.setHeader("Set-Cookie", cookie.serialize('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: refreshTokenAge,
    domain: 'localhost',
    sameSite: 'Lax',
    path: '/',
  }))
  res.send(answer);
})

authRouter.get('/logout', (req, res) => {
  res.setHeader("Set-Cookie", cookie.serialize('refreshToken', '', {
    httpOnly: true,
    maxAge: 0,
    domain: 'localhost',
    sameSite: 'Lax',
    path: '/',
  }))
  res.status(200).send({accessToken: null, error: null})
})
const signatureAccess = 'MySuP3R_z3kr3t_access'
authRouter.get('/profile', verifyAuthorizationMiddleware, (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  const decoded = jwt.verify(token, signatureAccess);
  let answer = {}
  if (decoded.login === 'Vika') {
    answer.role = 2
  }
  if (decoded.login === 'Johnn') {
    answer.role = 3
  }
 res.status(200).send({answer})
})

authRouter.get('/refresh', verifyRefreshTokenMiddleware, (req, res) => {
  const {accessToken, refreshToken} = getTokens(req.user.login)

  res.setHeader("Set-Cookie", cookie.serialize('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    domain: 'localhost',
    sameSite: 'Lax',
    path: '/',
  }))
  res.send({accessToken})
})

module.exports = authRouter;