'use strict';

const { usersService }
  = require('./userService');

function getAllUsers(req, res) {
  res.json(usersService.getUsers());
};

function getUserbyId(req, res) {
  const { id } = req.params;
  const user = usersService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.json(user);
};

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = {
    id: usersService.users.length + 1,
    name,
  };

  usersService.addUser(user);
  res.statusCode = 201;

  res.json(user);
};

function deleteUser(req, res) {
  const { id } = req.params;
  const index = usersService.userIndex(id);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }
  usersService.deleteUserByIndex(index);

  res.sendStatus(204);
};

function updateUser(req, res) {
  const { id } = req.params;

  const { name } = req.body;
  const index = usersService.userIndex(id);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  res.status(200);

  res.json(usersService.updateUserName(index, name));
};

const usersController = {
  getAllUsers,
  getUserbyId,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = {
  usersController,
};
