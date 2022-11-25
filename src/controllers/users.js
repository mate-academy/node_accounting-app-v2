'use strict';

const userServise = require('../Services/user');

const add = (req, res) => {
  const { name } = req.body;
  const newUser = userServise.createUser(name);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(newUser);
};

const getALL = (req, res) => {
  const users = userServise.getAll();

  if (!users) {
    res.send([]);

    return;
  }
  res.statusCode = 200;
  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = userServise.getUser(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundUser);
};

const update = (req, res) => {
  const { userId } = req.params;

  const foundUser = userServise.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  const updateUser = userServise.updateUser({
    userId,
    name,
  });

  res.statusCode = 200;
  res.send(updateUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServise.getUser(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServise.deleteUser(+userId);

  res.sendStatus(204);
};

module.exports = {
  add,
  getALL,
  getOne,
  update,
  remove,
};
