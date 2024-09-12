'use strict';

const { usersService } = require('./users.service');

const getAllUsers = (req, res) => {
  res.send(usersService.getUsers());
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addNextUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const nextUser = {
    id: Date.now(),
    name,
  };

  usersService.addUser(nextUser);
  res.statusCode = 201;
  res.send(nextUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.body;
  const index = usersService.indexOfUser(userId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(index);
  res.sendStatus = 204;
};

const userToUpdate = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const index = usersService.indexOfUser(userId);

  if (!name || index === -1) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
  res.send(usersService.updateUser(index, name));
};

const usersController = {
  getAllUsers,
  getOneUser,
  addNextUser,
  deleteUser,
  userToUpdate,
};

module.exports = { usersController };
