'use strict';

let {
  users,
} = require('../services/userServices');

const {
  userId,
  newUser,
  foundUser,
  wantedUser,
  changedUserIndex,
  deletedUserIndex,
} = require('../services/userServices');

function cleanUsersArray() {
  users = [];
};

const createUser = (req, res) => {
  const { body } = req;

  const { name } = body;

  if (!name || foundUser(name, users)) {
    res.sendStatus(400);

    return;
  };

  users.push(newUser(name, userId));
  res.status(201).json(newUser(name, userId));
};

const getUsers = (req, res) => {
  res.send(users);
};

const getUserById = (req, res) => {
  const {
    params: { id },
  } = req;

  if (!wantedUser(users, id)) {
    res.sendStatus(404);
  };

  res.json(wantedUser(users, id));
};

const editUser = (req, res) => {
  const {
    params: { id },
  } = req;
  const newIndex = changedUserIndex(users, id);

  if (newIndex !== -1) {
    users[newIndex].name = req.body.name;
    res.send(users[newIndex]);

    return;
  };

  res.sendStatus(404);
};

const deleteUser = (req, res) => {
  const {
    params: { id },
  } = req;
  const deletedIndex = deletedUserIndex(users, id);

  if (deletedIndex !== -1) {
    users.splice(deletedIndex, 1);
    res.sendStatus(204);

    return;
  };

  res.sendStatus(404);
};

function takeUsers() {
  return users;
};

module.exports = {
  cleanUsersArray,
  createUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  takeUsers,
};
