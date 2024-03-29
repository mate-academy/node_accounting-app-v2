const userServices = require('../services/user.service.js');

const get = (req, res) => {
  res.send(userServices.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const user = userServices.create(name);

  res.statusCode = 201;
  res.send(user);
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

const remove = (req, res) => {
  const { id } = req.params;

  if (!userServices.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userServices.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userServices.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
