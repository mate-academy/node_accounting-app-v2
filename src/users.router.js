const service = require('./usersServices.js');

const getAllUsers = async (req, res) => {
  const users = await service.getAllUsers();

  res.status(200).json(users);
};

const addUser = async (req, res) => {
  const name = req.body.name;

  try {
    const user = await service.addUser(name);

    res.status(201).json(user);
  } catch {
    res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.sendStatus(400);
  }

  const foundUser = await service.getUser(userId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  res.status(200).json(foundUser);
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.sendStatus(400);
  }

  const deletedUser = await service.deleteUser(userId);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const userToUpdateId = req.params.id;
  const userName = req.body.name;

  const updatedUser = await service.updateUser(userToUpdateId, userName);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.status(200).json(updatedUser);
};

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
};
