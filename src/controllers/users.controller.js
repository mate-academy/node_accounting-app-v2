const usersModel = require('../models/users.model');

async function getAllUsers(req, res) {
  try {
    const users = await usersModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати користувачів' });
  }
}

async function getUser(req, res) {
  try {
    const userId = +req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await usersModel.getUser(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `Користувача ${userId} не знайдено` });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати користувача' });
  }
}

async function postUser(req, res) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = await usersModel.createUser(name.trim());

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити користувача' });
  }
}

async function removeUser(req, res) {
  try {
    const userId = +req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const removedUser = await usersModel.removeUser(userId);

    if (!removedUser) {
      return res
        .status(404)
        .json({ message: `Користувача ${userId} не знайдено` });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити користувача' });
  }
}

async function updateUser(req, res) {
  try {
    const userId = +req.params.userId;
    const { name } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required in URL' });
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'New name is required' });
    }

    const updatedUser = await usersModel.editUser(userId, name.trim());

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `Користувача ${userId} не знайдено` });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося оновити користувача' });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  postUser,
  removeUser,
  updateUser,
};
