const userServices = require('../services/user.service');

const get = (req, res) => {
  res.send(userServices.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const user = userServices.getOne(id);

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.create(name);

  res.status(201).send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userServices.getOne(id)) {
    res.sendStatus(404);
  }

  userServices.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.sendStatus(400);
  }

  if (!userServices.getOne(id)) {
    res.sendStatus(404);
  }

  const updatedUser = userServices.update(name, id);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
