const userService = require('../services/users.service');

const getAllUsers = (_req, res) => {
  const users = userService.getUsers();

  res.send(users);
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getUser(+id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
};

const addUser = (req, res) => {
  const userData = req.body;

  try {
    const user = userService.addUser(userData);

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const user = userService.updateUser(+id, userData);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (error) {
    res.statusMessage(error.message).sendStatus(400);
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const didDelete = userService.deleteUser(+id);

  if (didDelete) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
  updateUser,
};
