'use strict';

const userSevises = require('../servises/userServises');

const getAll = (req, res) => {
  const users = userSevises.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userSevises.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  res.statusCode = 200;
  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userSevises.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userSevises.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userSevises.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userSevises.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  userSevises.update(foundUser, name);
  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
