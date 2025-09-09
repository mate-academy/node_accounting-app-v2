const { usersService } = require('../services/users.service');

const getAll = async (req, res) => {
  const user = await usersService.getUsers();

  res.status(200);
  res.json(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.createUser(name);

  res.status(201);
  res.json(user);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const user = await usersService.getUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200);
  res.json(user);
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const success = await usersService.deleteUser(id);

  if (!success) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const name = req.body.name;

  if (isNaN(id) || !name) {
    return res.sendStatus(400);
  }

  const user = await usersService.updateUser({ id, name });

  if (!user) {
    return res.sendStatus(404);
  }
  res.status(200);
  res.json(user);
};

module.exports.usersController = {
  getAll,
  create,
  getById,
  deleteUser,
  updateUser,
};
