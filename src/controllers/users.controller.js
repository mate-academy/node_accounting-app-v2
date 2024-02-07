'use strict';

const { usersService } = require('../services/users.service');

const usersController = {
  get: (req, res) => {
    res.status(200).json(usersService.getUsers());
  },

  create: (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const newUser = usersService.createUser(name);

    res.status(201).json(newUser);
  },

  getOne: (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const foundUser = usersService.getUserById(+id);

    if (!foundUser) {
      return res.sendStatus(404);
    }

    res.status(200).json(foundUser);
  },

  remove: (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    if (!usersService.getUserById(+id)) {
      return res.sendStatus(404);
    }

    usersService.removeUserById(+id);

    res.sendStatus(204);
  },

  update: (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.sendStatus(400);
    }

    if (!usersService.getUserById(+id)) {
      return res.sendStatus(404);
    }

    res.status(200).json(usersService.updateUserById(+id, { name }));
  },
};

module.exports = {
  usersController,
};
