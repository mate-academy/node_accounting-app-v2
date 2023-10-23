'use strict';

const users = [];

function getUsers(req, res) {
  res.send(users);
}

function getUserById(req, res) {
  const { id } = req.params;
  const searchId = +id;

  const userResult = users.find(user => user.id === searchId);

  if (!userResult) {
    res.sendStatus(404);

    return;
  }
  res.send(userResult);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  let id = Math.max(...users.map(person => person.id)) + 1;

  if (id === -Infinity) {
    id = 0;
  }

  const user = {
    id,
    name,
  };

  users.push(user);
  res.statusCode = 201;
  res.send(user);
}

function updateUser(req, res) {
  const { id } = req.params;
  const searchId = +id;
  const { name } = req.body;

  const index = users.findIndex(person => person.id === searchId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const user = users[index];

  Object.assign(user, { name });
  res.send(user);
}

function deleteUser(req, res) {
  const { id } = req.params;
  const searchId = +id;

  const index = users.findIndex(person => person.id === searchId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  users.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  users,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
