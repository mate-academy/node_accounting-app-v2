'use strict';

const usersServices = require('../services/users');

const getAll = (req, res) => {
  const users = usersServices.getAllUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = usersServices.getUser(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = usersServices.getUser(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersServices.removeUser(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const user = usersServices.getUser(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  usersServices.updateUser(
    {
      id: +id, name,
    }
  );
  res.send(user);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
