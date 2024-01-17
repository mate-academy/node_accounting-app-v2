'use strict';

const userService = require('../services/user.service');

const getAll = (req, res) => {
  try {
    const users = userService.findAllUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const findById = (req, res) => {
  try {
    const { userId } = req.params;
    const user = userService.findUserById(userId);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const createNewUser = (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Bad Request: Name is required');
      return;
    }

    const newUser = userService.createUser(name);

    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteUserById = (req, res) => {
  try {
    const { userId } = req.params;
    const neededUser = userService.findUserById(userId);

    if (!neededUser) {
      res.sendStatus(404);
      return;
    }

    userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const handleUserUpdate = (req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = userService.findUserById(userId);
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.status(422).send('Unprocessable Entity: Name should be a string');
      return;
    }

    const updatedUser = userService.updateUser({
      id: userId,
      name,
    });

    if (!foundUser || !updatedUser) {
      res.sendStatus(404);
      return;
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAll,
  findById,
  createNewUser,
  deleteUserById,
  handleUserUpdate,
};
