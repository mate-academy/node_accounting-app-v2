'use strict';

const userService = require('../services/users.service');

const getAllUsers = (req, res) => {
  try {
    const users = userService.getAll();

    res.json(users);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getOneUser = (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.getById(+id);

    if (!user) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }
    res.json(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const createUser = (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;
      res.statusMessage = 'Error';
      res.end();
    }

    const newUser = userService.create(name);

    res.statusCode = 201;
    res.json(newUser);
    res.end();
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = userService.getById(+id);

    if (!user || !name) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }

    const updatedUser = userService.update(id, name);

    res.json(updatedUser);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const removeUser = (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.getById(+id);

    if (!user) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }

    userService.remove(+id);
    res.statusCode = 204;
    res.end();
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
