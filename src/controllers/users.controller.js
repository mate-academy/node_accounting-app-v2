const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  res.send(usersService.getAll());
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(usersService.create({ name }));
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);

  if (user === undefined) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(usersService.update({ id, name }));
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 204;
  res.send(usersService.remove(user.id));
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};
