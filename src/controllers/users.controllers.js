'use strict';

const userServices = require('../services/user.service');

const get = (_, res) => {
  res.statusCode = 200;
  res.send(userServices.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const choosedUser = userServices.getById(id);

  if (!choosedUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(choosedUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(userServices.create(name));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userServices.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const choosedUser = userServices.getById(id);

  if (!choosedUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userServices.update({
    id, name,
  });

  res.send(updatedUser);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
