const { usersService } = require('../service/users.service');

const getUsers = async (req, res) => {
  const users = await usersService.getUsers();

  res.json(users);
};

const getUser = async (req, res) => {
  const user = await usersService.getUser(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = usersService.createUser(name);

  res.status(201).json(user);
};

const deleteUser = async (req, res) => {
  const deletedUser = await usersService.deleteUser(+req.params.id);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const name = req.body.name;
  const user = await usersService.getUser(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = usersService.updateUser(+req.params.id, name);

  res.json(updatedUser);
};

const usersController = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = {
  usersController,
};
