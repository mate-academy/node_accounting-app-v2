/* eslint-disable no-unused-vars */
'use strict';

let users = [];

const init = () => {
  users = [];
};

function findUserById(id) {
  const numberId = Number(id);
  const foundUser = users.find((user) => user.id === numberId);

  return foundUser;
}

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const createdUser = {
    id: Math.floor(Math.random() * 100),
    name,
  };

  users.push(createdUser);
  res.statusCode = 201;
  res.send(createdUser);
};

const getAllUsers = (req, res) => {
  res.statusCode = 200;
  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const foundUsers = findUserById(id);

  if (!foundUsers) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundUsers);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const foundUsers = findUserById(id);

  if (!foundUsers) {
    res.sendStatus(404);

    return;
  }

  users = users.filter(user => user.id !== +id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let validationError = false;
  const foundUsers = findUserById(id);

  if (!name) {
    validationError = true;
    res.sendStatus(400);
    validationError = true;
  }

  if (!foundUsers) {
    res.sendStatus(404);

    return;
  }

  if (!validationError) {
    foundUsers.name = name;
    res.statusCode = 200;
    res.send(foundUsers);
  }
};

const exist = (id) => {
  return users.some(user => user.id === id);
};

module.exports = {
  init,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  findUserById,
  exist,
};
