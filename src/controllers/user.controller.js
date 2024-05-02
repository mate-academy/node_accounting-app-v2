const userService = require('../services/user.service');

const getAll = (_, res) => {
  res.send(userService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  res.statusCode = 201;
  res.send(userService.create(name));
};

const get = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    return res.sendStatus(404);
  }

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!userService.getById(id)) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  res.send(userService.update(id, name));
};

module.exports = {
  getAll,
  create,
  get,
  remove,
  update,
};
