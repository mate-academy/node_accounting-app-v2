const { usersService } = require('../services/user.services.js');

const createUser = (req, res) => {
  const user = req.body;

  if (!user.name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide name of user' });
  }

  const newUser = usersService.createUser(user.name);

  res.status(201).json(newUser);
};

const getUsers = (req, res) => {
  const users = usersService.getUsers();

  res.status(200).json(users);
};

const getUser = (req, res) => {
  const neededUser = usersService.getUserById(+req.params.id);

  if (!neededUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(neededUser);
};

const deleteUser = (req, res) => {
  const user = usersService.deleteUserById(+req.params.id);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: 'User does not exist' });
  }

  res.status(204).end();
};

const updateUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = usersService.getUserById(+req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = usersService.updateUserById({
    id: +req.params.id,
    name,
  });

  res.json(updatedUser);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
