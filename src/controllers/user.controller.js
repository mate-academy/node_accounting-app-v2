'use strict';

const { userService } = require('../services/user.service.js');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Request does not have "name" property.');
  }

  const user = userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const user = userService.getById(+id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const user = userService.getById(+id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  userService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const user = userService.getById(+id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const updatedUser = userService.update({
    id: +id,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  userController: {
    getAll,
    create,
    getOne,
    remove,
    update,
  },
};
