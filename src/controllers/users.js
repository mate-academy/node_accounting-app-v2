'use strict';

import * as services from '../services/services.js';

export const getAll = (req, res) => {
  const users = services.getUsers();

  res.send(users);
};

export const getOne = (req, res) => {
  const { userId } = req.params;

  const selectedUser = services.getUserById(userId)

  if (!selectedUser) {
    res.sendStatus(400);
    return;
  }

  res.send(selectedUser);
}

export const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
    return;
  }

  const newUser = services.createUser(name)


  res.send(newUser);
}

export const remove = (req, res) => {
  const { userId } = req.params;

  const foundUser = services.getUserById(userId);


  if (!foundUser) {
    res.sendStatus(400);
    return;
  }

  services.removeUser(userId);
  res.sendStatus(200);
}

export const update = (req, res) => {
  const { userId } = req.params;

  const foundUser = services.getUserById(userId)

  if (!foundUser) {
    res.sendStatus(400)
    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(404)
    return
  }

  services.amendUser({ id: userId, name })

  res.send(foundUser);
}
