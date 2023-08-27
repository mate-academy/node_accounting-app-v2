/* eslint-disable no-param-reassign */
'use strict';

const userServices = require('../services/users.js');
const helpers = require('../services/helpers.js');

const getAllUsers = (users) => {
  return (req, res) => {
    res.status(200).send(users);
  };
};

const getUserById = (users) => {
  return (req, res) => {
    const userId = +req.params.userId;

    if (isNaN(userId)) {
      res.sendStatus(400);

      return;
    }

    const userById = helpers.getElementById(users, userId);

    if (!userById) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(userById);
  };
};

const createUser = (users) => {
  return (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = userServices.addUser(users, name);

    res.status(201).send(newUser);
  };
};

const deleteUser = (users) => {
  return (req, res) => {
    const userId = +req.params.userId;

    if (!helpers.isElementExists(users, userId)) {
      res.sendStatus(404);

      return;
    }

    users = helpers.deleteElementById(users, userId);

    res.sendStatus(204);
  };
};

const updateUser = (users) => {
  return (req, res) => {
    const userId = +req.params.userId;

    if (!helpers.isElementExists(users, userId)) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = userServices.updateUserById(users, userId, name);

    res.status(200).send(updatedUser);
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
