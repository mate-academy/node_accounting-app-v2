'use strict';

const userServices = require('../services/user.service');
const codeStuses = require('../variables');

const get = (_, res) => {
  res.statusCode = codeStuses.SUCCESS_CODE_STATUS;
  res.send(userServices.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const choosedUser = userServices.getById(id);

  if (!choosedUser) {
    res.sendStatus(codeStuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  res.status(codeStuses.SUCCESS_CODE_STATUS).send(choosedUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(codeStuses.BAD_REQUEST_CODE_STATUS);

    return;
  }

  res.statusCode = codeStuses.CREATED_CODE_STATUS;
  res.send(userServices.create(name));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userServices.getById(id)) {
    res.sendStatus(codeStuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  userServices.remove(id);

  res.sendStatus(codeStuses.UNDERSTANDING_CODE_STATUS);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const choosedUser = userServices.getById(id);

  if (!choosedUser) {
    res.sendStatus(codeStuses.NOT_FOUND_CODE_STATUS);

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
