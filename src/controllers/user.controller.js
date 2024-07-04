const User = require('../models/user.model');

const getUsers = (req, res) => {
  const users = User.getUsers();

  res.send(users);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = User.addUser(name);

  res.status(201).send(newUser);
};

const getUser = (req, res) => {
  const { id } = req.params;
  const user = User.getUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const userToDelete = User.getUser(id);

  if (!userToDelete) {
    return res.sendStatus(404);
  }

  User.deleteUser(id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const properties = req.body;
  const userToUpdate = User.getUser(req.params.id);

  if (!userToUpdate) {
    return res.sendStatus(404);
  }

  const updatedUser = User.updateUser(req.params.id, properties);

  res.send(updatedUser);
};

module.exports = {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
};
