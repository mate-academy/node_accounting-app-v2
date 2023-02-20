/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
'use strict';

const {
  getUsers,
  getUserById,
  addUser,
  removeUser,
  updateUser,
} = require('../services/users');

const getUsersController = async (req, res) => {
  const users = await getUsers();

  res.send(users);
};

const getUserController = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Invalid id');
  }

  try {
    const user = await getUserById(+id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const addUserController = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Invalid name');
  }

  try {
    const user = await addUser(name);

    if (!user) {
      return res.status(500).send('Error adding user');
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const removeUserController = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Invalid id');
  }

  try {
    const user = await getUserById(+id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    await removeUser(+id);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || isNaN(+id) || !name) {
    return res.status(400).send('Invalid id or name');
  }

  try {
    const user = await getUserById(+id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const updatedUser = await updateUser(+id, name);

    if (!updatedUser) {
      return res.status(500).send('Error updating user');
    }

    return res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getUsersController,
  getUserController,
  addUserController,
  removeUserController,
  updateUserController,
};
