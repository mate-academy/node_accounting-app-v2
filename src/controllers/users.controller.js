/* eslint-disable no-console */
const usersService = require('../services/users.service.js');

const get = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.status(201).json(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);

  if (!user) {
    console.log('User not found');

    return res.status(404).json({ message: 'User not found' });
  }

  usersService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
