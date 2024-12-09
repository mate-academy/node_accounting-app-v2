const usersServices = require('../services/users.service.js');

const get = (req, res) => {
  res.send(usersServices.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = usersServices.getUserById(id);

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

  const user = usersServices.createUser(name);

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersServices.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  usersServices.deleteUser(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersServices.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = usersServices.updateUser({ id, name });

  res.status(200).send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
