const usersService = require('../services/users.service.js');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const user = await usersService.getById(req.params.userId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const remove = async (req, res) => {
  const user = await usersService.getById(req.params.userId);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(req.params.userId);

  res.status(204).end();
};

const update = async (req, res) => {
  const { name } = req.body;

  const user = await usersService.getById(req.params.userId);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update({
    id: req.params.userId,
    name,
  });

  res.json(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
