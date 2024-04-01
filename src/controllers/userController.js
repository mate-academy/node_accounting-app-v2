const usersService = require('../services/user');

const get = (req, res) => {
  res.statusCode = 200;
  res.send(usersService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const User = usersService.getById(id);

  if (!User) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(User);
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
  const { id } = req.params;

  if (!usersService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const User = usersService.update(id, name);

  if (!User) {
    res.sendStatus(404);

    return;
  }
  res.send(User);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
