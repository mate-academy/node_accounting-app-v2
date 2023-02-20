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
    return res.sendStatus(400);
  }

  try {
    const user = await getUserById(+id);

    if (!user) {
      return res.sendStatus(404);
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
    return res.sendStatus(400);
  }

  try {
    const user = await addUser(name);

    if (!user) {
      return res.sendStatus(400);
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
    return res.sendStatus(400);
  }

  try {
    const user = await getUserById(+id);

    if (!user) {
      return res.sendStatus(404);
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
    return res.sendStatus(400);
  }

  try {
    const user = await getUserById(+id);

    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = await updateUser(+id, name);

    if (!updatedUser) {
      return res.sendStatus(400);
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
