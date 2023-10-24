'use strict';

const users = [];

const postUser = (req, res) => {
  if (!req.body.name) {
    return res.status(400);
  }

  const user = {
    id: users.length,
    name: req.body.name,
  };

  users.push(user);

  res.sendStatus(200);
};

const getAllUsers = (req, res) => {
  res.status(200).send(users);
};

const getUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200);
};

const deleteUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  const index = users.indexOf(user);

  users.splice(index, 1);

  res.status(204).end();
};

const patchUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  if (req.body.name) {
    user.name = req.body.name;
  }

  res.status(200).send(user);
};

const usersService = {
  postUser,
  getUser,
  getAllUsers,
  patchUser,
  deleteUser,
};

module.exports = {
  usersService,
};
