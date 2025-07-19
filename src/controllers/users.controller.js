const usersModel = require('../models/users.model');

function getAllUsers(req, res) {
  try {
    const users = usersModel.getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати користувачів' });
  }
}

function getUser(req, res) {
  try {
    const userId = +req.params.userId;
    const user = usersModel.getUser(userId);

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

function postUser(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = usersModel.createUser(name);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити користувача' });
  }
}

function removeUser(req, res) {
  try {
    const userId = +req.params.userId;
    const removedUser = usersModel.removeUser(userId);

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

function updateUser(req, res) {
  try {
    const { name } = req.body;
    const userId = +req.params.userId;

    if (!name) {
      return res.status(400).json({ error: 'New name is required' });
    } else if (!userId) {
      return res.status(400).json({ error: 'UserId is required in URL' });
    }

    const updatedUser = usersModel.editUser(userId, name);

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
