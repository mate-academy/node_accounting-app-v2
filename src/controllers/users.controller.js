const {
  add,
  get,
  getAll,
  remove,
  update,
} = require('../services/users.service.js');

const getUsers = (req, res) => {
  res.status(200).send(getAll());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Bad request');
  }

  const newUser = add(name);

  res.status(201).send(newUser);
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

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  const removeOne = remove(+id);

  if (!removeOne) {
    return res.status(404).send('Not found');
  }

  return res.sendStatus('204');
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || isNaN(+id) || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).send('Bad request');
  }

  const updatedUser = update({ id: +id, name });

  if (!updatedUser) {
    return res.status(404).send('Not found');
  }

  return res.status(200).send(updatedUser);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
};
