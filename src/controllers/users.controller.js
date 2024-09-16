'use strict';

const usersService = require('../services/user.service');

const getAll = (req, res) => {
  res.send(usersService.getAllUsers());
};

const getParticular = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getUserById(Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const deleteParticular = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const deletedUser = usersService.deleteUserById(Number(id));

  if (!deletedUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateParticular = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersService.updateUserById(Number(id), req.body);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.status(201);
  res.send(usersService.createUser(name));
};

module.exports = {
  getAll,
  createUser,
  getParticular,
  deleteParticular,
  updateParticular,
};
