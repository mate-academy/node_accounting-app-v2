const userService = require('../services/user.service');

const get = (req, res) => {
  res.status(200).send(userService.getUsers());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const newUser = userService.createUser(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getUser(id)) {
    return res.sendStatus(404);
  }
  userService.deleteUser(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  if (typeof name !== 'string' || !name) {
    return res.sendStatus(422);
  }

  const userToUpdate = userService.updateUser({ id, name });

  res.status(200).send(userToUpdate);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
