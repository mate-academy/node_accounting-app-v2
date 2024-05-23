const userService = require('./../services/user.service');
const statusCodes = require('../utils/statusCodes');

const getAll = (_, res) => {
  const users = userService.getAll();

  res.status(statusCodes['OK']).send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(statusCodes['NOT_FOUND']);
  }

  res.status(statusCodes['OK']).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(statusCodes['BAD_REQUEST']);

    return;
  }

  const user = userService.create(name);

  res.status(statusCodes['CREATED']).send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(statusCodes['NOT_FOUND']);

    return;
  }

  if (!name) {
    res.sendStatus(statusCodes['UNPROCESSABLE_ENTITY']);

    return;
  }

  const newUser = userService.update(user, { name });

  res.status(statusCodes['OK']).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(statusCodes['NOT_FOUND']);

    return;
  }

  userService.remove(id);
  res.sendStatus(statusCodes['NO_CONTENT']);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
