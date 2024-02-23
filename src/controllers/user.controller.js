const userService = require('../services/user.service');

const get = (req, res) => {
  res.send(userService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = userService.create(name);

  res.status(201).json(user);
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const neededUser = userService.getOne(id);

  if (!neededUser) {
    return res.sendStatus(404);
  }

  res.status(200).send(neededUser);
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);

  if (!userService.getOne(id)) {
    return res.sendStatus(404);
  }

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  if (typeof name !== 'string' || !name.length) {
    return res.sendStatus(400);
  }

  if (!userService.getOne(id)) {
    return res.sendStatus(404);
  }

  const updatedUser = userService.update(id, name);

  res.status(200).json(updatedUser);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
