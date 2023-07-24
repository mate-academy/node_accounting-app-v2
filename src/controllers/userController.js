'use strict';

const { userService } = require('../services/userService');

const userController = {
  getAll: async(req, res) => {
    const users = await userService.getAll();

    res.send(users);
  },

  create: async(req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = await userService.create(name);

    res.statusCode = 201;

    res.send(newUser);
  },

  getOne: async(req, res) => {
    const { userId } = req.params;
    const user = await userService.getById(Number(userId));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  },

  remove: async(req, res) => {
    const { userId } = req.params;

    const user = await userService.getById(Number(userId));

    if (!user) {
      res.sendStatus(404);

      return;
    }
    await userService.remove(Number(userId));
    res.sendStatus(204);
  },

  update: async(req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const user = await userService.getById(Number(userId));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = await userService.update({
      id: Number(userId), name,
    });

    res.send(updatedUser);
  },
};

module.exports = { userController };
