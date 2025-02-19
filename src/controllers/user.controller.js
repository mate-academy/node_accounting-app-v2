const userService = require('../services/user.service');

const get = (req, res) => {
  res.send(userService.getUsers());
};

const getUser = (req, res) => {
  let { id } = req.params;

  id = Number(id);

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const removeUser = (req, res) => {
  let { id } = req.params;

  id = Number(id);

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  let { id } = req.params;
  const { name } = req.body;

  id = Number(id);

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userService.updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
