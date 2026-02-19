const userServices = require('../services/user.services');

const getAll = (req, res) => {
  res.send(userServices.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = userServices.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body || {};
  const isNameValid = typeof name === 'string' && name.trim().length;

  if (!isNameValid) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = userServices.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body || {};

  const user = userServices.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const isNameValid = typeof name === 'string' && name.trim().length;

  if (!isNameValid) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userServices.update({ id, name });

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
