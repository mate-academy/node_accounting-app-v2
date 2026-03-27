const usersService = require('../services/users.service');

const get = (users) => (req, res) => {
  res.json(usersService.getAll(users));
};

const getOne = (users) => (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const reqId = usersService.getById(users, id);

  if (!reqId) {
    return res.status(404).send('Not Found');
  }

  res.json(reqId);
};

const create = (users) => (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Bad Request');
  }

  const user = usersService.create(users, name);

  return res.status(201).json(user);
};

const remove = (users) => (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const deleted = usersService.remove(users, id);

  if (!deleted) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
};

const update = (users) => (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const { name } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).send('Bad Request');
  }

  const userToUpdate = usersService.getById(users, id);

  if (!userToUpdate) {
    return res.status(404).send('Not Found');
  }

  const updatedUser = usersService.update(userToUpdate, name);

  res.status(200).json(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
