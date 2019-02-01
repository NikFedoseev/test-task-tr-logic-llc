const express = require('express');
const router = express.Router();
const userService = require('./userService');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/', requireToken);

module.exports = router;

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then( token => {
      token ? res.json(token) : res.status(403).json({ message: 'Username or password is incorrect'})
    })
    .catch(err => res.json({ message: err }));
}

function register(req, res, next) {
  userService.register(req.body)
    .then(() => res.json({register: 'ok'}))
    .catch(err => res.json({ message: err }));
}

function dashboard (res, data) {
  userService.getById(data.id)
  .then(user => {
    res.json({
      message: 'verified',
      user: user
    })
  })
}

function requireToken(req, res, next) {
  const token = req.headers.authorization;
  const secret = config.secret;
  jwt.verify(token, secret, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      dashboard(res, data)
    }
  })
}