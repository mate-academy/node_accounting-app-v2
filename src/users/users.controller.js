const usersService = require('./users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const id = +req.params.id;
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const deleteOne = async (req, res) => {
  const id = +req.params.id;

  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update({ id, name });

  res.json(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
