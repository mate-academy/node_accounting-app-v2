'use strict';

const { userService } = require('../services/user.service.js');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update({
    id: +id,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  userController: {
    getAll,
    create,
    getOne,
    remove,
    update,
  },
};
