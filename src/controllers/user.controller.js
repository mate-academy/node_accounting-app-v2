const UsersService = require('../services/user.service');

const get = (req, res) => {
  res.status(200).send(UsersService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = UsersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = UsersService.create(name);

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = UsersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  UsersService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = UsersService.getById(id);

  if (typeof name !== 'string') {
    res.statusCode(400);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = UsersService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
