'use strict';

const { usersService } = require('../services/users');

const usersControllers = {
  getAll: (req, res) => {
    const users = usersService.getAll();

    res.send(users);
  },
  getOne: (req, res) => {
    const { userId } = req.params;

    const findUserById = usersService.getById(userId);

    if (!findUserById) {
      res.sendStatus(404);

      return;
    }

    res.send(findUserById);
  },
  create: (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = usersService.create(name);

    res.statusCode = 201;
    res.send(newUser);
  },
  remove: (req, res) => {
    const { userId } = req.params;
    const findUserById = usersService.getById(userId);

    if (!findUserById) {
      res.sendStatus(404);

      return;
    }

    usersService.remove(userId);
    res.sendStatus(204);
  },
  update: (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    usersService.update(userId, name);
    res.send(foundUser);
  },
};

module.exports = {
  usersControllers,
};
