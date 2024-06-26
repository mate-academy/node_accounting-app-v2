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

  const user = usersService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(id);

  if (user === null) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (user === null) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (usersService.getById(id) === null) {
    res.sendStatus(404);

    return;
  }

  const user = usersService.update({ id, name });

  res.send(user);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
