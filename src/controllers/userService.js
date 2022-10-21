/* eslint-disable no-unused-vars */
'use strict';

let users = [];

const init = () => {
  users = [];
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
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
  if (!users) {
    res.statusCode = 200;
    res.send([]);

    return;
  }

  res.statusCode = 200;
  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  const foundUser = users.find((user) => user.id === numberId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  const foundUser = users.find(user => user.id === numberId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  users = users.filter(user => user.id !== numberId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const { name } = req.body;

  const foundUser = users.find(user => user.id === numberId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  foundUser.name = name;
  res.statusCode = 200;
  res.send(foundUser);
};

function findUser(id) {
  return users.find(user => user.id === id);
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
  findUser,
  exist,
};
