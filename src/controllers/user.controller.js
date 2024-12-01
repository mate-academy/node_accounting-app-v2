const userService = require('../services/user.service.js');

const get = (_req, res) => {
  res.status(200).send(userService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;

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
    return res.sendStatus(400);
  }

  const newUser = userService.create(name);

  // res.statusCode = 201;

  // res.send(newUser);
  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(200);

    return;
  }

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.send(user);

    return;
  }

  const updatedUser = userService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
};
