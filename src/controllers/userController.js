const userService = require('../services/userService');
const { STATUS_CODE } = require('../utils/statusCodes');

const getAll = (req, res) => {
  const allUsers = userService.getAll();

  res.send(allUsers);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  const user = userService.create(name);

  res.status(STATUS_CODE.CREATED).send(user);
};

const get = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  userService.remove(id);

  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  const updatedUser = userService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  create,
  get,
  remove,
  update,
};
