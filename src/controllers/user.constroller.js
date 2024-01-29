'use strict';

const {
  getAllUsers, getUserById, createUser, deletUser,
} = require('../services/users.services');

const getAll = (req, res) => {
  res.send(getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = getUserById(+id);

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.status(201);
  res.send(createUser(name));
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const isUserExist = getUserById(+id);

  if (!isUserExist) {
    res.sendStatus(404);

    return;
  }

  deletUser(+id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  addUser,
  deleteUser,
};
