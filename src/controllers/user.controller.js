const userService = require('../services/user.service');
const STATUS_CODES = require('../constant/statusCode');

const getAll = (_, res) => {
  res.statusCode = STATUS_CODES.successful;
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  res.statusCode = STATUS_CODES.successful;
  res.send(user);
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    return res.sendStatus(STATUS_CODES.badRequest);
  }

  const user = userService.create(name);

  res.statusCode = STATUS_CODES.created;
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  userService.remove(id);

  return res.sendStatus(STATUS_CODES.noContent);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(STATUS_CODES.unprocessableEntity);
  }

  const userId = Number(id);
  const user = userService.getById(userId);

  if (!user) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  user.name = name;
  res.statusCode = STATUS_CODES.successful;
  res.send(user);
};

module.exports = {
  getAll,
  getById,
  postUser,
  deleteUser,
  updateUser,
};
