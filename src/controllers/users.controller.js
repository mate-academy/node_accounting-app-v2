const usersService = require('../services/users.service');

async function getAll(req, res) {
  const users = await usersService.getAllUsers();

  res.json(users);
}

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = await usersService.createUser(name);

  return res.status(201).json(user);
}

async function getUserById(req, res) {
  const { id } = req.params;

  const user = await usersService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
}

async function removeUser(req, res) {
  const { id } = req.params;
  const result = await usersService.removeUser(id);

  if (!result) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.sendStatus(204);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersService.getUserById(Number(id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Name is required' });
  }

  const updatedUser = await usersService.updateUser({ id, name });

  res.send(updatedUser);
}

module.exports = {
  getAll,
  createUser,
  getUserById,
  removeUser,
  updateUser,
};
