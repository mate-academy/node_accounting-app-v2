const { usersService } = require('../services/users.service.js');

const getUsers = (req, res) => {
  const users = usersService.getUsers();

  res.status(200).json(users);
};

const getUserById = (req, res) => {
  const user = usersService.getUserById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const createUser = (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = usersService.createUser(name);

  res.status(201).json(user);
};

const deleteUserById = (req, res) => {
  const user = usersService.deleteUserById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateUserById = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = usersService.getUserById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = usersService.updateUserById({
    id: +req.params.id,
    name,
  });

  res.json(updatedUser);
};

const usersController = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};

module.exports = {
  usersController,
};
