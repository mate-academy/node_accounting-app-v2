'use strict';

const userServices = require('../services/users');

const getAll = (req, res) => {
  res.send(userServices.getAllUsers());
};

const getUser = (req, res) => {
  const { todoId } = req.params;

  if (!userServices.getUser(todoId)) {
    res.sendStatus(404);

    return;
  }

  res.send(userServices.getUser(todoId));
};

const createNewUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.createNewUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  const status = userServices.deleteUser(userId);

  if (status) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || !userId) {
    res.sendStatus(400);

    return;
  }

  const status = userServices.updateUser(userId, name);

  if (status) {
    res.send(status);
  } else {
    res.sendStatus(404);
  }
};

module.exports.getAll = getAll;
module.exports.getUser = getUser;
module.exports.createNewUser = createNewUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
