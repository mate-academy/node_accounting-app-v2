const usersService = require('./users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.status(200).json(users);
};

const getById = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).send();
  }

  const user = await usersService.createUser(name);

  res.status(201).json(user);
};

const deleteById = async (req, res) => {
  const user = await usersService.deleteById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.updateUser({
    id: req.params.id,
    name,
  });

  res.json(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateUser,
};
