const usersServices = require('../services/users.service.js');

const getAllUsers = (req, res) => {
  res.send(usersServices.allUsers());
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const userById = usersServices.userById(id);

  if (!userById) {
    res.sendStatus(404);

    return;
  }

  res.send(userById);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.createUser(name);

  res.status(201).send(newUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!usersServices.userById(id)) {
    res.sendStatus(404);

    return;
  }

  usersServices.deleteUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const userById = usersServices.userById(id);

  if (!userById) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = usersServices.updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
