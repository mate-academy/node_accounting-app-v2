'use strict';

const userService = require('../service/user.service');

const getAll = (req, res) => {
  res.send(userService.get());
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const addOne = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create({ name });

  res.statusCode = 201;
  res.send(newUser);
};

const deleteOne = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);
  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  if (isNaN(id) || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update({
    id,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
