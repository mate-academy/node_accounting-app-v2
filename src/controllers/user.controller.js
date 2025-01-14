const userService = require('./../services/user.service');

const getUsers = (req, res) => {
  const users = userService.getAllUsers();

  res.send(users);
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(+id);

  if (!user) {
    return res.status(404).send('Error');
  }
  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = userService.createUser(name);

  res.status(201).send(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUserById(+id);

  if (!user) {
    return res.status(404).send('Error');
  }

  if (typeof name !== 'string') {
    return res.status(422).send('Error');
  }

  const updatedUser = userService.updateUser({ id: +id, name });

  res.status(200).send(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(+id)) {
    return res.status(404).send('Error');
  }

  userService.removeUser(+id);
  res.status(204).send();
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
