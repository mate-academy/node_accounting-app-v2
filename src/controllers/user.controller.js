const userService = require('../services/user.service');

const getAll = (_, res) => {
  res.statusCode = 200;
  res.send(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(user);
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    return res.sendStatus(400);
  }

  const user = userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    return res.sendStatus(404);
  }

  userService.remove(id);

  return res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(422);
  }

  const userId = Number(id);
  const user = userService.getById(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  user.name = name;
  res.statusCode = 200;
  res.send(user);
};

module.exports = {
  getAll,
  getById,
  postUser,
  deleteUser,
  updateUser,
};
