/* eslint-disable no-console */
const usersModel = require('../services/User.service.js');

async function get(req, res) {
  try {
    const allUsers = await usersModel.getAllUsers();

    res.status(200).json(allUsers);
  } catch (err) {
    console.error('Failed to get users', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getOne(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const user = await usersModel.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Failed to get user', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const user = await usersModel.createUser(name);

    res.status(201).json(user);
  } catch (err) {
    console.error('Failed to create user', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function remove(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const user = await usersModel.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await usersModel.deleteUser(id);
    res.status(204).end();
  } catch (err) {
    console.error('Failed to delete user', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function update(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const body = req.body;

  try {
    const user = await usersModel.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!body.name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const updatedUser = await usersModel.updateUser(id, body);

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Failed to update user', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
