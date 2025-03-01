const usersService = require('../services/users.service');

const get = (req, res) => {
  res.send(usersService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.sendStatus(422);

    return;
  }

  const user = usersService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const newUser = usersService.update(+id, name);

  res.status(200).json(newUser);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
