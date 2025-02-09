const userService = require('../services/user.service');

const get = (req, res) => {
  return res.status(200).json(userService.getAllUsers());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send();
  }

  const newUser = userService.createUser(name);

  return res.status(201).json(newUser);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send();
  }

  const findUser = userService.getUserById(id);

  if (!findUser) {
    return res.status(404).send();
  }

  return res.status(200).json(findUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  const findUser = userService.getUserById(id);

  if (!findUser) {
    return res.status(404).send();
  }

  userService.deleteUser(id);

  return res.status(204).send();
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || isNaN(id) || !name) {
    return res.status(400).send();
  }

  const findUser = userService.getUserById(id);

  if (!findUser) {
    return res.status(404).send();
  }

  const updatedUser = userService.updateUser(id, name);

  return res.status(200).json(updatedUser);
};

module.exports = {
  create,
  get,
  getById,
  remove,
  update,
};
