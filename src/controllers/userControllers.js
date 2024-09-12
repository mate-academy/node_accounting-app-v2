'use strict';

const {
  getAllUsers,
  getUserById,
  deleteUser,
  postUser,
  updateUser,
} = require('../services/userServices');

const getUsers = (req, res) => {
  res.send(getAllUsers());
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(404);
    res.end('add name please');

    return;
  }

  const newUser = postUser(name);

  res.sendStatus(201);
  res.send(newUser);
  // try {
  // } catch (e) {
  //   res.sendStatus(500);
  //   res.end(e);
  // }
};

const changeUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);
    res.send('you don\'t have such user');

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(404);
    res.send('invalid type of data');

    return;
  }

  const updatedUser = updateUser(id, name);

  res.sendStatus(201);
  res.send(updatedUser);
};

const removeUser = (req, res) => {
  // const { id } = req.params;

  // const user = getUserById(id);

  // if (!user) {
  //   res.sendStatus(404);

  //   return;
  // }

  // deleteUser(id);

  // res.sendStatus(204);

  try {
    const { id } = req.params;
    const neededUser = getUserById(id);

    if (!neededUser) {
      res.sendStatus(404);

      return;
    }

    deleteUser(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getUsers,
  getUser,
  removeUser,
  createUser,
  changeUser,
};
