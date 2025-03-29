const { usersService } = require('./service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.status(200).json(users || []);
};

const addUser = async (req, res) => {
  const userName = req.body.name;

  if (!userName || typeof userName !== 'string') {
    res.status(400).json('Invalid data request');

    return;
  }

  try {
    const newUser = await usersService.addUser(userName);

    res.status(201).json(newUser);
  } catch {
    res.status(500).json('Server error');
  }
};

const getUser = async (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json('Invalid request data');
  }

  try {
    const user = await usersService.getUser(userId);

    if (!user) {
      return res.status(404).json('User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json('Server error');
  }
};

const removeUser = async (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json('Invalid request data');
  }

  try {
    const user = await usersService.getUser(userId);

    if (!user) {
      return res.status(404).json('User not found');
    }

    await usersService.deleteUser(userId);
    res.status(204).send(); // Виправлено: тест очікує `204 No Content`
  } catch {
    res.status(500).json('Server error');
  }
};

const updateUser = async (req, res) => {
  const newName = req.body.name;
  const idToUpdate = Number(req.params.id);

  if (!newName || !idToUpdate) {
    return res.status(400).json('Invalid data request');
  }

  try {
    const updatedUser = await usersService.updateUser(idToUpdate, newName);

    if (!updatedUser) {
      return res.status(404).json('User not found');
    }

    res.status(200).json(updatedUser);
  } catch {
    res.status(500).json('Server error');
  }
};

module.exports = {
  getAll,
  addUser,
  getUser,
  removeUser,
  updateUser,
};
