'use strict';

const { getMaxId } = require('../utils/helpers');

let users = [];

const getAllUsers = (req, res) => {
  res.send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;
  const id = getMaxId(users);

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return res.status(201).send(newUser);
};

const hello = (req, res) => res.send('Hello');

module.exports = {
  createUser, getAllUsers, hello,
};
