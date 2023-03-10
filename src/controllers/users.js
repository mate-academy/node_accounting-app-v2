'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getById = (req, res) => {
  const { id } = req.params;

  try {
    const user = usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
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

    res.status(201).send(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

const remove = (req, res) => {
  const { id } = req.params;

  try {
    const user = usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    usersService.remove(id);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = usersService.update(id, { name });

    res.send(updatedUser);
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
