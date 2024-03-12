'use strict';

const usersService = require('../services/usersService');
const codeStatus = require('../constants/codeStatuses');

const get = (_, res) => {
  res.statusCode = codeStatus.SUCCESS;
  res.send(usersService.getAll());
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const choosedUser = usersService.getUserById(id);

  if (!choosedUser) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  res.status(codeStatus.SUCCESS).send(choosedUser);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(codeStatus.BAD_REQUEST);

    return;
  }

  res.statusCode = codeStatus.CREATED;
  res.send(usersService.create(name));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getUserById(id)) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  usersService.remove(id);

  res.sendStatus(codeStatus.UNDERSTOOD);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const choosedUser = usersService.getUserById(id);

  if (!choosedUser) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  const updatedUser = usersService.update({
    id, name,
  });

  res.send(updatedUser);
};

module.exports = {
  get,
  getUserById,
  create,
  remove,
  update,
};
