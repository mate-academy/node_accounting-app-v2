const usersService = require('./../services/users.service');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.status(200).send(users);
};

const getById = (req, res) => {
  const { id } = req.params;

  const user = usersService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || name === '') {
    res.sendStatus(400);
  }

  const newUser = usersService.create(name);

  res.status(201).json(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name: newName } = req.body;
  const user = usersService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = usersService.update(id, newName);

  res.status(200).json(updatedUser);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const user = usersService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  usersService.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
