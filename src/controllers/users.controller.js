const usersService = require('../services/users.service');

const getAll = (_, res) => {
  res.send(usersService.getAll());
};

const getOne = (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(id);

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

  res.statusCode = 201;
  res.send(usersService.create(name));
};

const remove = (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const isDeleted = usersService.remove(id);

  if (!isDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.update(id, name);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
