'use strict';

const { userServices } = { ...require('../services/users') };

const userController = {
  getAll: (req, res) => {
    const users = userServices.getAll();

    res.send(users);
  },
  getOne: (req, res) => {
    const userId = req.params.userId;
    const findUser = userServices.getOne(userId);

    if (!findUser) {
      res.sendStatus(404);
    }

    res.send(findUser);
  },
  create: (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = userServices.create(name);

    res.statusCode = 201;
    res.send(newUser);
  },
  remove: (req, res) => {
    const id = req.params.userId;

    const filteredUsers = userServices.remove(id);

    if (!filteredUsers) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 204;
    res.send(filteredUsers);
  },
  update: (req, res) => {
    const userId = req.params.userId;
    const findUser = userServices.getOne(userId);

    if (!findUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(findUser, { name });

    res.send(findUser);
  },
  reset: userServices.reset,
};

module.exports = {
  userController,
};
