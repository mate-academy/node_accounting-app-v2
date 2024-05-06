const userService = require('../services/user.service');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const userId = req.params.id;

  const user = userService.getOne(userId);

  if (!user) {
    res.status(404).send('Bad request');

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Bad request');

    return;
  }

  const newUser = userService.create({ name });

  res.status(201).send(newUser);
};

const update = (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;

  const user = userService.getOne(userId);

  if (!user) {
    res.status(404).send('Not Found');

    return;
  }

  if (!name) {
    res.status(400).send('Bad request');

    return;
  }

  const updatedUser = userService.update({ id: user.id, name });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const userId = +req.params.id;

  const user = userService.getById(userId);

  if (!user) {
    res.status(404).send('Not Found');

    return;
  }

  userService.remove(user.id);

  res.status(204).send('User removed');
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
