const { getAll, add, get, remove, update } = require("../services/users.service");

const getUsers = (req, res) => {
  res.status(200).send(getAll());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Bad request');
  }

  res.status(201).send(add(name));
};

const getUser = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  const user = get(+id);

  if (!user) {
    return res.status(404).send('Not found');
  }

  res.status(200).send(user);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const userToRemove = remove(+id);

  if (!userToRemove) {
    return res.status(404).send('Not found');
  }

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || isNaN(+id) || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).send('Bad request');
  }

  const user = update(+id, name);

  if (!user) {
    return res.status(404).send('Not found');
  }

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
};
