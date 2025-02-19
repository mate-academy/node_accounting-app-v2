'use strict';
/*eslint-disable*/
const { generateId } = require('../utils/idWrapper');

const defaultUser = {
  'name': 'string',
};
const users = [];

const getUserById = (req, res) => {
  const { userId } = req.params;
  const user = users.find(el => el.id === +userId);

  if (user) {
    res.statusCode = 200;
    res.send(user);
  } else {
    res.statusCode = 404;
    res.send('User not found');
  }
};

const getAllUsers = (req, res) => {
  res.statusCode = 200;
  res.send(users);
};

const createUser = (req, res) => {
  const userData = { ...req.body };
  const prepUserData = Object.keys(userData)
    .filter(key => key !== 'id')
    .sort()
    .join('');
  const prepDefUserData = Object.keys(defaultUser)
    .filter(key => key !== 'id')
    .sort()
    .join('');

  if (prepUserData !== prepDefUserData) {
    res.statusCode = 400;
    res.send('User parameters is not valid');
  } else {
    const newUser = {
      ...userData,
      id: generateId(),
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  }
};

const updateUser = (req, res) => {
  const userData = req.body;
  const { userId } = req.params;

  if (Object.keys(userData).some(key => (
    !Object.keys(defaultUser).includes(key)
  ))) {
    res.statusCode = 400;
    res.send('User parameters is not valid');
  } else {
    const user = users.find(el => el.id === +userId);
    const index = users.indexOf(user);

    if (index > -1) {
      Object.assign(user, userData);

      res.statusCode = 200;
      res.send(user);
    } else {
      res.statusCode = 404;
      res.send('User not found');
    }
  }
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const index = users.findIndex(el => el.id === +userId);

  if (index > -1) {
    users.splice(index, 1);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

const clearUsers = () => {
  users.length = 0;
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  clearUsers,
  users,
};
