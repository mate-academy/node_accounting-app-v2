'use strict';

let users = [];

const clearUsers = () => (users = []);

const getAllUsers = (req, res) => {
  return res.status(200).send(users);
};

const getUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).send(user);
};

const postUser = (req, res) => {
  if (!req.body.name) {
    return res.sendStatus(400);
  }

  const user = {
    id: new Date().getTime(),
    name: req.body.name,
  };

  users.push(user);

  return res.status(201);
};

const patchUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  if (req.body.name) {
    user.name = req.body.name;
  }

  return res.status(200).send(user);
};

const deleteUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  const index = users.indexOf(user);

  users.splice(index, 1);

  return res.status(204);
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
  clearUsers,
};
