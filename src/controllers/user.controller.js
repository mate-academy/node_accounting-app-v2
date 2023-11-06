'use strict';

const { userService } = require('../services/user.service');

const userController = {
  get: (req, res) => {
    res.send(userService.getAll());
  },

  getOne: (req, res) => {
    const { id } = req.params;

    const user = userService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  },

  addUser: (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = userService.addUser({ name });

    res.statusCode = 201;
    res.send(newUser);
  },

  remove: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(204);

      return;
    }

    if (!userService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    userService.removeUser(id);
    res.sendStatus(204);
  },

  update: (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!userService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = userService.updateUser(body, id);

    res.send(updatedUser);
  },
};

module.exports = userController;
