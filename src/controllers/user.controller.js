/* eslint-disable no-console */
const userService = require('../services/user.service');

const getUsers = (req, res) => {
  res.send(userService.getAll());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.create(name);

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;
  res.send(user);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  console.log('getUser: ', user);

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(+id)) {
    res.sendStatus(404);

    return;
  }
  userService.remove(+id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!userService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updateduser = userService.update({ id, name });

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.send(updateduser);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
