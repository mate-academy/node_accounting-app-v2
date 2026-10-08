const userServices = require('../services/users.services');

const getAll = (req, res) => {
  res.send(userServices.getAll());
};

const getUser = (req, res) => {
  const user = userServices.getUser(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(userServices.create(name));
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!userServices.getUser(id)) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  res.send(userServices.update(id, name));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userServices.getUser(id)) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getUser,
  add,
  update,
  remove,
};
