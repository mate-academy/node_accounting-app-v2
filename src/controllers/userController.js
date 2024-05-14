const userService = require('../services/userService');
const { STATUS_CODE } = require('../utils/statusCodes');

const getAll = (req, res) => {
  const allUsers = userService.getAllUsers();

  res.send(allUsers);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  const user = userService.createUser(name);

  res.status(STATUS_CODE.CREATED).send(user);
};

const get = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(id)) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  userService.removeUser(id);

  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  const updatedUser = userService.updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  create,
  get,
  remove,
  update,
};
