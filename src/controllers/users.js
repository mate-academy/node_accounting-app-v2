'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOneById = (req, res) => {
  const { userId } = req.params;
  const foundedUser = usersService.getUserById(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedUser);
};

const addOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.addUser(name);

  res.sendStatus = 201;
  res.send(newUser);
};

const deleteOne = (req, res) => {
  const { userId } = req.params;
  const foundedUser = usersService.getUserById(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(+userId);
  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundedUser = usersService.getUserById(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = usersService.updateUser(+userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOneById,
  addOne,
  deleteOne,
  updateOne,
};
