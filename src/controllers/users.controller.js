const usersService = require('../services/users.service.js');

const get = (req, res) => {
  return res.status(200).json(usersService.getUsers());
};

const getOne = (req, res) => {
  const userId = Number(req.params.id);
  const user = usersService.getUser(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = (req, res) => {
  const userName = req.body.name;

  if (!userName) {
    return res.sendStatus(400);
  }

  const user = usersService.addUser({ name: userName });

  res.status(201).json(user);
};

const update = (req, res) => {
  const userId = Number(req.params.id);
  const newName = req.body.name;
  const updatedUser = usersService.updateUser(userId, newName);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.json(updatedUser);
};

const remove = (req, res) => {
  const userId = Number(req.params.id);
  const index = usersService.getUsers().findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json('Not Found');
  }

  usersService.removeUser(index);

  return res.status(204).end();
};

module.exports = {
  get,
  create,
  getOne,
  update,
  remove,
};
