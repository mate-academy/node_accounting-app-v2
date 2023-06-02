'use strict';

let users = [];

const getAll = (req, res) => {
  res.send(users);

  return users;
};

const returnAll = () => {
  return users;
};

const getById = (req, res) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id.toString() === userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};
const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  let id = 1;

  if (users.length) {
    id = users[users.length - 1].id + 1;
  }

  const user = {
    id,
    name,
  };

  users.push(user);

  res.statusCode = 201;
  res.send(user);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const filteredUsers = users.filter(({ id }) => id.toString() !== userId);

  if (filteredUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  users = filteredUsers;
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = users.find(user => user.id.toString() === userId);

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  Object.assign(foundUser, { name });

  res.send(foundUser);
};

const removeAll = () => {
  users = [];
};

module.exports = {
  returnAll,
  getAll,
  getById,
  create,
  remove,
  update,
  removeAll,
};
