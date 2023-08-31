'use strict';

const userService = require('../services/users.js');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  try {
    const foundUser = userService.getById(userId);

    if (!foundUser) {
      res.status(404).send('User not found');

      return;
    }

    res.status(200).send(foundUser);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Fill all fields');

    return;
  }

  const newUser = userService.create(name);

  res.status(201).send(newUser);
};

const update = (req, res) => {
  const { userId } = req.params;

  try {
    const foundUser = userService.getById(userId);

    if (!foundUser) {
      res.status(404).send('User not found');

      return;
    }

    const { name } = req.body;
    const updatedUser = userService.update(userId, name);

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const remove = (req, res) => {
  const { userId } = req.params;

  try {
    const foundUser = userService.getById(userId);

    if (!foundUser) {
      res.status(404).send('User not found');

      return;
    }

    userService.remove(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
