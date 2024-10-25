const userService = require('../services/user.service');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const user = req.entry;

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  const user = userService.create(name);

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id } = req.entry;

  userService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { name } = req.body;
  const { id } = req.entry;
  const updatedUser = userService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
