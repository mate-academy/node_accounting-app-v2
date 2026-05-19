const usersService = require('../services/users.service.js');

const get = (req, res) => {
  res.json(usersService.getAll());
};

const getOne = (req, res) => {
  const id = Number(req.params.id);
  const user = usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (name === undefined || name === '') {
    return res.sendStatus(400);
  }

  const user = usersService.create(name);

  res.status(201).json(user);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (name === undefined || name.trim() === '') {
    return res.sendStatus(400);
  }

  const user = usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = usersService.update({ id, name });

  res.json(updatedUser);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  if (!usersService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
