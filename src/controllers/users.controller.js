const userService = require('../services/users.service');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const newUser = userService.create(name);

  res.status(201);
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(id);

  if (!user) {
    res.statusCode(404);
  }

  if (typeof name !== 'string') {
    res.statusCode(400);
  }

  const updateUser = userService.update({ id, name });

  res.send(updateUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
