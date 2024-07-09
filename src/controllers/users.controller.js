const userService = require('./../services/users.service');

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();

  res.send(users);
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.removeUserById(id);
  res.sendStatus(204);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.createUserByName(name);

  res.statusCode = 201;
  res.send(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userService.updateUserData({ id, name });

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  removeUser,
  addUser,
  updateUser,
};
