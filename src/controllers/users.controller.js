const userService = require('../services/user.service');

const getAll = (req, res) => {
  return res.json(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    return res.status(404).send({ message: 'Not found' });
  }

  return res.json(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'Bad request' });
  }

  const newUser = userService.create(name);

  res.status(201).json(newUser);
};

const upDate = (req, res) => {
  const { id } = req.params;

  const userUpdate = userService.upDate({ id, ...req.body });

  if (!userUpdate) {
    return res.status(404).send({ message: 'Not found' });
  }

  Object.assign(userUpdate, req.body);
  res.json(userUpdate);
};

const deleteById = (req, res) => {
  const { id } = req.params;
  const deleteUser = userService.deleteById(id);

  if (!deleteUser) {
    return res.status(404).send({ message: 'Not found' });
  }

  return res.status(204).end();
};

const userController = {
  getAll,
  getById,
  create,
  upDate,
  deleteById,
};

module.exports = {
  userController,
};
