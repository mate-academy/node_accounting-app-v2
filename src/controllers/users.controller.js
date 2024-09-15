'use strict';

const usersService = require('../services/users.service');

const getAllUsers = (req, res) => {
  const users = usersService.getAll();

  res.status(200).send(users);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getById(Number(userId));

  if (!foundUser) {
    res.status(404).send('User not found');

    return;
  }

  res.status(200).send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('All input fields are required');

    return;
  }

  if (typeof name !== 'string') {
    res.status(422).send('Incorrect Data Format');

    return;
  }

  const newUser = usersService.create(name);

  res.status(201).send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getById((Number(userId)));

  if (!foundUser) {
    res
      .sendStatus(404).send(`Unable to delete user with id: ${userId}`);

    return;
  }

  usersService.remove(Number(userId));
  res.status(204).send(`User with id ${userId} deleted successfully`);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;
  const foundUser = usersService.getById(Number(userId));

  if (typeof name !== 'string') {
    res.status(422).send('Incorrect Data Format');

    return;
  }

  if (!foundUser) {
    res.status(404).send('User not found');

    return;
  }

  usersService.update({
    id: Number(userId),
    name,
  });
  res.status(200).send(foundUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
  updateUser,
};
