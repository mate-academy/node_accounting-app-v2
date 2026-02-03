const userService = require('../services/users.services.js');

const getAllUsers = (users) => (req, res) => {
  res.status(200).send(users);
};

let usersNumber = 1;

const postUsers = (users) => (req, res) => {
  const { name, id } = req.body;

  if (id) {
    res.status(400).send('Bad request');

    return;
  }

  if (typeof name !== 'string') {
    res.status(400).send('Bad request');

    return;
  }

  const user = {
    name: name,
    id: usersNumber,
  };

  usersNumber++;

  users.push(user);
  res.status(201).send(user);
};

const getUserById = (users) => (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad request');

    return;
  }

  const user = userService.findUser(users, id);

  if (!user) {
    res.status(404).send('Not found');

    return;
  }

  res.status(200).send(user);
};

const deleteUser = (users) => (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === +id);

  if (index === -1) {
    return res.status(404).send('Not found');
  }

  users.splice(index, 1);

  res.sendStatus(204);
};

const patchUsers = (users) => (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400).send('Bad request');

    return;
  }

  const user = userService.findUser(users, id);

  if (!user) {
    res.status(404).send('Not found');

    return;
  }

  user.name = name;

  res.status(200).send(user);
};

module.exports = {
  getAllUsers,
  postUsers,
  getUserById,
  deleteUser,
  patchUsers,
};
