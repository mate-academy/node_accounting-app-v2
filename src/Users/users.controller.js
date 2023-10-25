'use strict';

const { usersService } = require('./users.service');

const getAllUsers = (req, res) => {
  return res.status(200).send(usersService.getAllUsers());
};

const getUser = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).send(user);
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = {
    id: new Date().getTime(),
    name,
  };

  usersService.postUser(user);

  return res.status(201).send(user);
};

const patchUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  return res.status(200).send(usersService.patchUser(id, name));
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  usersService.deleteUser(id);

  return res.sendStatus(204);
};

const usersController = {
  getUser,
  getAllUsers,
  postUser,
  patchUser,
  deleteUser,
};

module.exports = {
  usersController,
};
