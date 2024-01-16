'use strict';

const {
  getAllUsers,
  deleteUser,
  getUserById,
  postNewUser,
  updateUser,
} = require('./../services/userServises');

const getUsers = (req, res) => res.send(getAllUsers());

const getUser = (req, res) => {
  const { id } = req.params;

  const user = getUserById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const postUser = (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = postNewUser(name);

  res.status(201);
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  deleteUser(id);

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  updateUser(user, name);

  res.send(user);
};

module.exports = {
  getUsers,
  postUser,
  getUser,
  removeUser,
  updateOne,
};
