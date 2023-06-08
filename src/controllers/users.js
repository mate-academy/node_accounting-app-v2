'use strict';

const usersService = require('../services/users.js');

function getAll(req, res) {
  res.statusCode = 200;
  res.send(usersService.getAll());
}

function getOne(req, res) {
  const id = req.params.id;

  if (!isFinite(id)) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.findUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

function add(req, res) {
  const newUserName = req.body.name;

  if (!newUserName || usersService.getAll()
    .some(user => user.name === newUserName)) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  const newUser = usersService.create(newUserName);

  res.send(newUser);
}

function remove(req, res) {
  const id = Number(req.params.id);
  const foundedUser = usersService.findUserById(id);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }
  usersService.remove(id);

  res.sendStatus(204);
};

function update(req, res) {
  const id = Number(req.params.id);
  const newUserName = req.body.name;

  if (!isFinite(id) || !newUserName) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.findUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  user.name = newUserName;
  res.statusCode = 200;
  res.send(user);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
