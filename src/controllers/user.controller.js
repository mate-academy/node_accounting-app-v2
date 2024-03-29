const userServises = require('../services/user.service.js');

const getUsers = (req, res) => {
  res.send(userServises.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = userServises.getOne(id);

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

  const user = userServises.create(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const notFound = userServises.remove(id);

  if (notFound) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userServises.update(id, name);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  getUsers,
  getOne,
  create,
  remove,
  update,
};
