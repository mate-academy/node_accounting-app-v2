const userService = require('../services/user.service');
const userHelpers = require('../helpers/user.helpers');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (userHelpers.isUserExist(id, res)) {
    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (userHelpers.nameCheck(name, res)) {
    return;
  }

  const user = userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (userHelpers.isUserExist(id, res)) {
    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (userHelpers.isUserExist(id, res) || userHelpers.nameCheck(name, res)) {
    return;
  }

  const updatedUser = userService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  remove,
  update,
  getOne,
};
