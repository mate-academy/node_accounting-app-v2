const { users } = require('../db/users');
const usersService = require('../services/users.services');

const getUsers = (req, res) => {
  res.send(users);
};

const createUser = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('Bad Request');
  }

  const newUser = usersService.create(req.body.name);

  res.status(201).send(newUser);
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const searchedUser = usersService.getById(id);

  if (!searchedUser) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(searchedUser);
};

const deleteUser = (req, res) => {
  const userId = Number(req.params.id);

  if (Number.isNaN(userId)) {
    return res.status(400).send('Bad Request');
  }

  const deletedUser = usersService.remove(userId);

  if (!deletedUser) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
};

const updateUser = (req, res) => {
  const userId = Number(req.params.id);
  const userName = req.body.name?.trim();

  if (Number.isNaN(userId) || !userName) {
    return res.status(400).send('Bad Request: Invalid data');
  }

  const updatedUser = usersService.update(userId, userName);

  if (!updatedUser) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(updatedUser);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
