'use strict';

const userServices = require('../Services/users');

module.exports = {
  getAll: (req, res) => res.send(userServices.getAll()),

  add: (req, res) => (!req.body.name)
    ? res.sendStatus(400)
    : res.status(201).send(userServices.createUser(req.body.name)),

  getUser: (req, res) => (user => !user
    ? res.sendStatus(404)
    : res.send(user))(userServices.getUserById(req.params.userId)),

  remove: (req, res) => (user => !user
    ? res.sendStatus(404)
    : userServices.removeUser(req.params.userId)
     && res.sendStatus(204))(userServices.getUserById(req.params.userId)),

  update: (req, res) => (user => !user
    ? res.sendStatus(404)
    : res.send(userServices.updateUser(req.params.userId, req.body.name))
  )(userServices.getUserById(req.params.userId)),
};
