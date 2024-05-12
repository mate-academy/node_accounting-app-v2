const usersService = require('../services/users.service');

const getAllUsers = (req, res) => {
  res.statusCode = 200;
  res.send(usersService.getUsers());
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  const user = usersService.getUserById(Number(id));

  if (!user) {
    res.sendStatus(404);
  }
  res.statusCode = 200;
  res.send(user);
};

const createNewUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const user = usersService.createUser(name);

  res.statusCode = 201;

  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(Number(id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(400);
  }

  if (typeof name !== 'string') {
    res.status(422);
  }

  const updatedUser = usersService.updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  deleteUser,
  updateUser,
};
