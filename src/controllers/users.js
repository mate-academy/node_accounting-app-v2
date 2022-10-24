'use strict';

const {
  getAll,
  createUser,
  getById,
  updateUser,
} = require('../services/users.js');

function getALLAppUsers(users) {
  function getAllUsers(req, res) {
    getAll(users);

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

function deleteOneUser(users) {
  function deleteUser(req, res) {
    const { id } = req.params;

    const foundUser = getById(users, +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users.splice(users.indexOf(users));
    res.sendStatus(204);
  }

  return deleteUser;
}

function getOneUser(users) {
  function getUser(req, res) {
    const { id } = req.params;

    const foundUser = getById(users, +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
    res.sendStatus(200);
  }

  return getUser;
}

module.exports = {
  getALLAppUsers,
  postOneUser,
  patchOneUser,
  deleteOneUser,
  getOneUser,
};
