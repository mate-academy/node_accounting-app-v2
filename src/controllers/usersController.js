const serviceUsers = require('./../services/usersService');

const get = (req, res) => {
  res.status(200).send(serviceUsers.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = serviceUsers.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = serviceUsers.createUser(name);

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = serviceUsers.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  serviceUsers.removeUser(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = serviceUsers.getUserById(id);

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = serviceUsers.updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
