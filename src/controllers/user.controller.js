const userServices = require('../services/user.service.js');

const getUsers = (req, res) => {
  res.send(userServices.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = userServices.getOne(id);

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(422);

    return;
  }

  const user = userServices.create(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const notFound = userServices.remove(id);

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
    res.sendStatus(422);

    return;
  }

  const updatedUser = userServices.update(id, name);

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
