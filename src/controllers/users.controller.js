const {
  getAllUsers,
  getUser,
  createUserPost,
  updateUser: updateUserService,
  deleteUser: deleteUserService,
} = require('../services/users.service');

const getUsers = (req, res) => {
  const users = getAllUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const idNumber = Number(req.params.id);

  if (isNaN(idNumber)) {
    return res.status(400).json({
      error: 'ID should be a number',
    });
  }

  const user = getUser(idNumber);

  if (!user) {
    return res.status(404).json({
      error: `user with ID ${idNumber} not found`,
    });
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: 'Name is required',
    });
  }

  const user = createUserPost({ name });

  res.status(201).json(user);
};

const updateUserById = (req, res) => {
  const idNumber = Number(req.params.id);

  if (isNaN(idNumber)) {
    return res.status(400).json({
      error: 'ID should be a number',
    });
  }

  if (!req.body.name) {
    return res.status(400).json({
      error: 'Name is required',
    });
  }

  const user = updateUserService(idNumber, req.body);

  if (!user) {
    return res.status(404).json({
      error: `user with ID ${idNumber} not found`,
    });
  }

  res.send(user);
};

const deleteUserById = (req, res) => {
  const idNumber = Number(req.params.id);

  if (isNaN(idNumber)) {
    return res.status(400).json({
      error: 'ID should be a number',
    });
  }

  const deleted = deleteUserService(idNumber);

  if (!deleted) {
    return res.status(404).json({
      error: `user with ID ${idNumber} not found`,
    });
  }

  res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
