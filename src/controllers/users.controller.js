'use strict';

const usersService = require('./../services/user.service');

const get = (req, res) => {
  res.send(usersService.getUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const oneUser = usersService.getUserById(id);

  if (!oneUser) {
    res.sendStatus(404);
  }

  res.send(oneUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.createUser(name);

  res.sendStatus(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const deletedUser = usersService.removeUser(id);

  if (!deletedUser) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const { updatedUser, oldUserIndex } = usersService.updateUser(name, id);

  if (oldUserIndex === -1) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  get, getOne, create, remove, updateOne,
};
