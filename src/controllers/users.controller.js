'use strict';

const usersService = require('../services/users.service');
const responseCodes = require('../constants/responseCodes');

const getAll = (req, res) => {
  res.send(usersService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(+id);

  if (!user) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.statusCode = responseCodes.SUCCESS;
  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const newUser = usersService.add(name);

  res.statusCode = responseCodes.CREATED;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const updatedUser = usersService.update(+id, name);

  if (!updatedUser) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.statusCode = responseCodes.SUCCESS;
  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  const isUserDeleted = usersService.remove(+id);

  if (!isUserDeleted) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.sendStatus(responseCodes.DELETED);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
