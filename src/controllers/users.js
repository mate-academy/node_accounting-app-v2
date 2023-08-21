'use strict';

const userServices = require('../services/users');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (typeof userId !== 'string') {
    res.statusMessage = 'Param "ID" is required';
    res.sendStatus(400);

    return;
  }

  const user = userServices.getById(userId);

  if (!user) {
    res.statusMessage = 'User not found';
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.statusMessage = 'Param "name" is required';
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.statusCode = 201;
  res.statusMessage = 'Creation successfully';
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (typeof userId !== 'string') {
    res.statusMessage = 'Param "ID" is required';
    res.sendStatus(400);

    return;
  }

  const user = userServices.getById(userId);

  if (!user) {
    res.statusMessage = 'User not found';
    res.sendStatus(404);

    return;
  }

  userServices.remove(userId);

  res.statusCode = 200;
  res.statusMessage = 'Removal successful';
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (typeof userId !== 'string') {
    res.statusMessage = 'Param "ID" is required';
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string') {
    res.statusMessage = 'Param "name" is required';
    res.sendStatus(400);

    return;
  }

  const user = userServices.getById(userId);

  if (!user) {
    res.statusMessage = 'User not found';
    res.sendStatus(404);

    return;
  }

  userServices.update({
    id: userId,
    name,
  });

  res.statusMessage = 'Update successful';
  res.send(user);
};

const controllers = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports = controllers;
