'use strict';

const usersService = require('../services/users');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.addUser(name);

  res.status(201);
  res.send(newUser);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundUser);
};

const editUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  Object.assign(foundUser, { name });

  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(+userId);

  res.status(204);
};

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  editUser,
  deleteUser,
};
