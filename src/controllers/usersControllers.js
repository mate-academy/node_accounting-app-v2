'use strict';

let users = [];

const init = () => {
  users = [];
};

const getUsers = (req, res) => {
  res.send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const id = Math.floor(Date.now() * Math.random());

  const userWithID = {
    id,
    name,
  };

  users.push(userWithID);
  res.status(201);
  res.send(userWithID);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find(user => user.id === +id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find(user => user.id === +id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  users = users.filter(user => +id !== user.id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const targetUser = users.find(user => user.id === +id);

  if (!targetUser) {
    res.sendStatus(404);

    return;
  }

  if (name) {
    targetUser.name = name;
  }

  res.send(targetUser);
};

const isUserExist = (id) => {
  return users.some(user => user.id === id);
};

const findUser = (id) => {
  return users.find(user => user.id === id);
};

module.exports = {
  init,
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  isUserExist,
  findUser,
};
