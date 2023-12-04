'use strict';

const userService = require('./../services/user.service');

const userController = {
  get: (req, res) => {
    res.send(userService.getAll());
  },

  getOne: (req, res) => {
    const { id } = req.params;

    const user = userService.getById(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  },

  post: (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = userService.create(name);

    res.statusCode = 201;
    res.send(user);
  },

  patch: (req, res) => {
    const { id } = req.params;

    const user = userService.update(+id, req.body);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  },

  delete: (req, res) => {
    const { id } = req.params;

    if (!userService.getById(+id)) {
      res.sendStatus(404);

      return;
    }

    userService.delete(+id);
    res.sendStatus(204);
  },
};

module.exports = userController;
