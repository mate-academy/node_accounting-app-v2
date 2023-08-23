'use strict';

let users = [];

const getUserById = (id) => {
  return users.find(user => user.id === +id);
};

const getAllUsers = (req, res) => {
  res.send(users);
};

const getById = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const filteredUsers = users.filter(user => user.id !== +userId);

  if (filteredUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  users = filteredUsers;

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  Object.assign(foundUser, { name });

  res.statusCode = 200;

  res.send(foundUser);
};

const clearUsers = () => {
  users.length = 0;
};

module.exports = {
  getAllUsers,
  getById,
  addUser,
  removeUser,
  updateUser,
  getUserById,
  clearUsers,
  users,
};
