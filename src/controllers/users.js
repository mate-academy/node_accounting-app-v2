'use strict';

const {
  getAll,
  createUser,
  getById,
  updateUser,
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

function postOneUser(users) {
  function postUser(req, res) {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = createUser(users, name);

    res.statusCode = 201;
    res.send(newUser);
  }

  return postUser;
}

function patchOneUser(users) {
  function patchUser(req, res) {
    const { id } = req.params;

    const foundUser = getById(users, +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    updateUser(name, +id, users);

    res.send(foundUser);
    res.sendStatus(200);
  }

  return patchUser;
}

module.exports = {
  getALLAppUsers,
  postOneUser,
  patchOneUser,
};
