const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/users.service');

const getUsers = (req, res) => {
  const users = getAll();

  res.status(200);
  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const user = getById(id);

  if (!user) {
    res.status(404);

    res.send('User not found');
  }

  res.status(200);
  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);

    res.send('Name is required');
  }

  const newUser = create(name);

  res.status(201);
  res.send(newUser);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send('Name is required');
  }

  const user = getById(id);

  if (!user) {
    res.status(404);
    res.send('User not found');
  }

  const updatedUser = update(id, name);

  res.status(200);
  res.send(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const user = getById(id);

  if (!user) {
    res.status(404);
    res.send('User not found');
  }

  const removedUser = remove(id);

  res.status(204);
  res.send(removedUser);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
