'use strict';

const usersServices = require('../services/usersServices');

const getAll = (req, res) => {
  const users = usersServices.getAll();

  res.statusCode = 200;
  res.send(users);
};

const getById = (req, res) => {
  const userId = +req.params.id;

  try {
    const foundUser = usersServices.getById(userId);

    if (!foundUser) {
      res.statusCode = 404;
      res.send('User not found');

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  } catch (error) {
    res.statusCode = 500;
    res.send('Internal Server Error');
  }
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
    res.send('Fill all fields');

    return;
  }

  const newUser = usersServices.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const userId = +req.params.id;

  const user = usersServices.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersServices.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const userId = +req.params.id;
  const { name } = req.body;

  if (!name || !userId) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersServices.update(userId, name);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
