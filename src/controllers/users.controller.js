const usersService = require('../services/users.service');

const getAllUsers = (req, res) => {
  res.send(usersService.getUsers());
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUser(Number(id));

  if (!user) {
    res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(user);
};

const createNewUser = (req, res) => {
  const body = req.body;

  if (!body.name) {
    res.sendStatus(400);
  }

  res.statusCode = 201;
  res.send(usersService.createUser(body));
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = usersService.getUser(Number(id));

  if (!user) {
    res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(usersService.updateUser(user.id, body));
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUser(Number(id));

  if (!user) {
    res.sendStatus(404);
  }

  usersService.deleteUser(user.id);
  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};
