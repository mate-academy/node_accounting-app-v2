const services = require('../services/user.services.js');

const getAllUsers = (req, res) => {
  const users = services.getAllUsersService();

  res.json(users);
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  const user = services.getUserByIdService(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.json(user);
};

const createNewUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.json({ error: 'Name is required' });

    return;
  }

  const user = services.createUserService(name);

  res.status(201);
  res.json(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = services.getUserByIdService(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = services.updateUserService(id, name);

  res.json(updatedUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = services.getUserByIdService(id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });

    return;
  }
  services.deleteUserService(id);
  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateUser,
  deleteUser,
};
