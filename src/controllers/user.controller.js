const userService = require('../services/user.service');

const get = (req, res) => {
  res.statusCode = 200;
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedUser = userService.update(id, name);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const deleted = userService.remove(id);

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
