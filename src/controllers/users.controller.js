const { usersService } = require('../services/users.service');

const getAll = async (_, res) => {
  const users = await usersService.getAll();

  res.set('Content-Type', 'application/json');
  res.json(users);
};

const getById = async (req, res) => {
  const user = await usersService.getById(parseInt(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  res.set('Content-Type', 'application/json');
  res.json(user);
};

const add = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.add({ name });

  res.set('Content-Type', 'application/json');
  res.status(201).json(user);
};

const remove = async (req, res) => {
  const userId = parseInt(req.params.id);

  if (!usersService.getById(userId)) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(userId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  const { name } = req.body;

  const updatedUser = await usersService.update({
    id: userId,
    name,
  });

  res.set('Content-type', 'application/json');
  res.json(updatedUser);
};

const usersController = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  usersController,
};
