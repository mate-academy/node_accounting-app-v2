'use strict';

const service = require('../services/users.service');
const statusCodes = require('../vars/statusCodes');

const getAll = (req, res) => {
  res.send(service.getAll());
};

const post = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const newUser = {
    id: +new Date(),
    name,
  };

  service.add(newUser);

  res.statusCode = statusCodes.CREATED;

  res.send(newUser);
};

const getById = (req, res) => {
  if (!req.params.id) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const searchedUser = service.getById(Number(req.params.id));

  if (!searchedUser) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.send(searchedUser);
};

const remove = (req, res) => {
  const searchedUser = service.getById(Number(req.params.id));

  if (!searchedUser) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  service.remove(Number(req.params.id));
  res.sendStatus(statusCodes.DELETED);
};

const update = (req, res) => {
  if (!req.body || !req.params.id) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const userToUpdate = service.update(Number(req.params.id), req.body.name);

  if (!userToUpdate) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.send(userToUpdate);
};

module.exports = {
  getAll,
  post,
  getById,
  remove,
  update,
};
