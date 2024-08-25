const usersServices = require('../services/usersServices');

const get = (req, res) => {
  res.status(200).send(usersServices.getUsers());
};
const getOne = (req, res) => {
  const { id } = req.params;
  const choosedUser = usersServices.getOneUser(id);

  if (!choosedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(200).send(choosedUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const choosedUser = usersServices.getOneUser(id);

  if (!choosedUser) {
    return res.sendStatus(404);
  }

  return res.sendStatus(200).send(usersServices.removeUser(id));
};

const patch = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const choosedUser = usersServices.getOneUser(id);

  if (name !== 'string') {
    return res.statusCode(400);
  }

  if (!choosedUser) {
    return res.sendStatus(404);
  }
  res.sendStatus(204).send(usersServices.updateUser({ id, name }));
};

const post = (req, res) => {
  const { name } = req.body;

  if (name !== 'string') {
    return res.statusCode(400);
  }

  return res.sendStatus(200).send(usersServices(name));
};

module.exports = {
  get,
  getOne,
  remove,
  patch,
  post,
};
