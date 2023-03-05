'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const id = +req.params.id;

  try {
    const user = usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

const add = (req, res) => {
  const { name } = req.body;

  try {
    const user = usersService.add(name);

    res.statusCode = 201;
    res.send(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

const remove = (req, res) => {
  const id = +req.params.id;

  try {
    if (!usersService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    usersService.remove(id);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
};

const update = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  try {
    if (!usersService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    const user = usersService.update(id, { name });

    res.send(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
