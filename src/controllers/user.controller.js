const userService = require('../services/user.service');

const get = (req, res) => {
  res.send(userService.get());
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(+id);

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

    return;
  }

  const newUser = userService.create(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.update(+id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
