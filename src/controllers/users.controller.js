const userService = require('../services/users.service.js');

const get = (req, res) => {
  res.status(200).send(userService.getUsers());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getUser(id);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  res.status(200).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const newUser = userService.createUser(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getUser(id)) {
    return res.status(404).send({ message: 'User not found' });
  }
  userService.deleteUser(id);
  res.status(204).send();
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUser(id);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  if (typeof name !== 'string' || !name) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const userToUpdate = userService.updateUser({ id, name });

  res.status(200).send(userToUpdate);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
