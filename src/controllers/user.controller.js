const userService = require('./../services/user.service');
const STATUS_CODES = require('../utils/statusCodes');

const getAll = (_, res) => {
  const users = userService.getAll();

  res.status(STATUS_CODES.ok).send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_CODES.not_found);
  }

  res.status(STATUS_CODES.ok).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(STATUS_CODES.bad_request);

    return;
  }

  const user = userService.create(name);

  res.status(STATUS_CODES.created).send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_CODES.not_found);

    return;
  }

  if (!name) {
    res.sendStatus(STATUS_CODES.unprocessable_entity);

    return;
  }

  const newUser = userService.update(user, { name });

  res.status(STATUS_CODES.ok).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(STATUS_CODES.not_found);

    return;
  }

  userService.remove(id);
  res.sendStatus(STATUS_CODES.no_content);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
