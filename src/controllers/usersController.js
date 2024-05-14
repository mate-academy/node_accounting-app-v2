const userService = require('../services/usersService');
const statusCode = require('../utils/statusCodes');

const getAll = (_, res) => {
  res.status(statusCode.SUCCESS).send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  res.status(statusCode.SUCCESS).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const user = userService.create(name);

  res.status(statusCode.CREATED).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  userService.remove(id);

  res.sendStatus(statusCode.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name || typeof name !== 'string') {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  const updatedUser = userService.update({ id, name });

  res.status(statusCode.SUCCESS).send(updatedUser);
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  getOne,
};
