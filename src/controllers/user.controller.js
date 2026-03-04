const userService = require('../services/user.service');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    res.status(404).send();

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send();

    return;
  }

  const user = userService.create(name);

  res.status(201).send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(id);

  if (!user) {
    res.status(404).send();

    return;
  }

  if (!name) {
    res.status(400).send();

    return;
  }

  if (typeof name !== 'string') {
    res.status(400).send();

    return;
  }

  const updatedUser = userService.update({ id, name });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.status(404).send();

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
