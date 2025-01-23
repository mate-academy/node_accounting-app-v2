const userService = require('../services/userService.js');

const getUsers = (req, res) => {
  res.send(userService.getAllUsers());
};

const getUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.status(200);
  res.json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.createUser(name);

  res.status(201).json(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;
  const updatedUser = userService.patchUser({ id, name });

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }
  res.status(200).json(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);
  res.sendStatus(204);
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  removeUser,
};
