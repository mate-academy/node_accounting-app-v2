'use strict';

const userServise = require('../servises/users.js');

function getAll(req, res) {
  const users = userServise.getAll();

  res.send(users);
}

function getOne(req, res) {
  const { userId } = req.params;

  const foundUser = userServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const newUser = userServise.create(name);

  res.sendStatus(201);
  res.send(newUser);
}

function deleteUser(req, res) {
   
}