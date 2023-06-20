'use strict';

const userServices = require('../services/users');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundedUser = userServices.getById(+userId);

  if (!foundedUser) {
    res.status(404).send({ error: 'Not found' });

    return;
  }

  res.status(200).send(foundedUser);
};

const add = (req, res) => {
  const { name } = req.body;
  const newUser = userServices.create(name);

  res.status(201).json(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  const status = userServices.removeUser(+userId);

  if (!status) {
    res.status(404).send({ error: 'Not found' });

    return;
  }

  res.status(204).send({ response: 'succesful delete' });
};

const update = (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;
  const updatedUser = userServices.update(+userId, { name });

  if (!updatedUser) {
    res.status(404).send({ error: 'Not found' });

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
