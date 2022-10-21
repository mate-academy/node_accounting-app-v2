'use strict';

const {
  getAll, getById, removeUser,
} = require('../services/users.js');

function getALLAppUsers(users) {
  function getAllUsers(req, res) {
    // eslint-disable-next-line no-param-reassign
    users = getAll(users);

    res.send(users);

    res.statusCode = 200;
  }

  return getAllUsers;
}

function getOneUser(users) {
  const newUs = users;

  function getUserById(req, res) {
    const { id } = req.params;

    const foundUser = getById(newUs, +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
    res.sendStatus(200);
  }

  return getUserById;
}

function removeAppUser(users) {
  function removeThisUser(req, res) {
    const { id } = req.params;

    const foundUser = getById(users, +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    // eslint-disable-next-line no-param-reassign
    users = removeUser(users, +id);
    res.sendStatus(204);
  }

  return removeThisUser;
}

module.exports = {
  getALLAppUsers,
  getOneUser,
  removeAppUser,
};
