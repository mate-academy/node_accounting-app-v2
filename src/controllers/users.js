'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const findById = (req, res) => {
  const userId = Number(req.params.userId);
  const isUserIdValid = !Number.isNaN(userId);

  if (!isUserIdValid) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.findById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;
  const isDataValid = (
    typeof name === 'string' && name
  );

  if (!isDataValid) {
    res.sendStatus(400);

    return;
  }

  const createdUser = usersService.create(name);

  res.statusCode = 201;
  res.send(createdUser);
};

const remove = (req, res) => {
  const id = +req.params.userId;
  const isValidId = id > 0;

  if (!isValidId) {
    res.sendStatus(400);

    return;
  }

  const userToRemove = usersService.findById(id);

  if (!userToRemove) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const userId = +req.params.userId;
  const userToUpdate = usersService.findById(userId);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const fieldsToUpdate = req.body;

  usersService.update(fieldsToUpdate, userToUpdate);

  res.send(userToUpdate);
};

module.exports = {
  getAll,
  findById,
  add,
  remove,
  update,
};
