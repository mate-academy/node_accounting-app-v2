const usersService = require('./users.service.js');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = async (req, res) => {
  if (!isValidParams(req.body)) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(req.body.name);

  res.status(201).json(user);
};

const deleteOne = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.deleteById(req.params.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!isValidParams(req.body)) {
    return res.sendStatus(400);
  }

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update({
    id: req.params.id,
    name: req.body.name,
  });

  res.json(updatedUser);
};

const isValidParams = (params) => {
  const { name } = params;

  return Boolean(name);
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
