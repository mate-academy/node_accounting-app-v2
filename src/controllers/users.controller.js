const usersService = require('../services/users.service');

const getUsers = (req, res) => {
  res.send(usersService.getUsers());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.createUser(name);

  res.status(201).send(newUser);
};

const getUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!usersService.getUser(id)) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  if (!usersService.getUser(id)) {
    res.sendStatus(404);

    return;
  }

  const newUser = usersService.updateUser(id, name);

  res.send(newUser);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
