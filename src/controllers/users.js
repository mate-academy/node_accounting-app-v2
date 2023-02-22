'use strict';

let users = [];

const initialUser = (req, res) => {
  users = [];
};

const getAllUsers = (req, res) => {
  res.send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  const maxId = users.length
    ? Math.max(...users.map(el => el.id))
    : 0;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  res.statusCode = 201;

  res.send(newUser);
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  const foundPerson = users.find(user => user.id === +userId);

  if (!foundPerson) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundPerson);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  const filteredUsers = users.filter(user => user.id !== +userId);

  if (filteredUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  users = filteredUsers;
  res.sendStatus(204);
};

const changeUsername = (req, res) => {
  const { userId } = req.params;

  const foundUser = users.find(user => user.id === +userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  Object.assign(foundUser, { name });

  res.statusCode = 200;
  res.send(foundUser);
};

const userExist = (userId) => {
  const isExist = users.some(user => user.id === userId);

  return isExist;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  changeUsername,
  initialUser,
  userExist,
};
