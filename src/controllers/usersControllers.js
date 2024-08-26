const usersServices = require('../services/usersServices');

const get = (req, res) => {
  return res.status(200).send(usersServices.getUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const choosedUser = usersServices.getOneUser(id);

  if (choosedUser === -1) {
    return res.status(404).send();
  }

  return res.status(200).send(choosedUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const choosedUser = usersServices.getOneUser(id);

  if (!choosedUser) {
    return res.status(404);
  }

  usersServices.removeUser(id);

  return res.status(200).send();
};

const patch = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const choosedUser = usersServices.getOneUser(id);

  if (!name) {
    return res.status(400);
  }

  if (!choosedUser) {
    return res.status(404);
  }
  res.status(204).send(usersServices.updateUser({ id, name }));
};

const post = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send();
  }

  const user = usersServices.createUser(name);

  return res.status(201).send(user);
};

module.exports = {
  get,
  getOne,
  remove,
  patch,
  post,
};
