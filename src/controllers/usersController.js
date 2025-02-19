const userService = require('../services/usersService');
const STATUS_CODE = require('../utils/statusCodes');

const getAll = (_, res) => {
  res.status(STATUS_CODE.SUCCESS).send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND);
  }

  res.status(STATUS_CODE.SUCCESS).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const user = userService.create(name);

  res.status(STATUS_CODE.CREATED).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND);
  }

  userService.remove(id);

  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name || typeof name !== 'string') {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND);
  }

  const updatedUser = userService.update({ id, name });

  res.status(STATUS_CODE.SUCCESS).send(updatedUser);
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  getOne,
};
