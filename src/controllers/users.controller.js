const usersService = require('../services/users.services.js');

const getAll = async (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const addUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const ids = usersService.getAllUsers().map((item) => item.id);
  const id = Math.max(ids) + 1;

  const newUser = {
    id: id,
    name: name,
  };

  usersService.addUser(newUser);

  res.status(201).send(newUser);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = usersService.findUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  if (!usersService.findUser(id)) {
    return res.sendStatus(404);
  }

  const newUsers = usersService.filteredUsers(id);

  usersService.changeUsers(newUsers);

  res.sendStatus(204);
};

const changeUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  let newUser = usersService.findUser(id);

  newUser = Object.assign(newUser, { name });

  res.send(newUser);
};

module.exports = {
  getAll,
  addUser,
  removeUser,
  getUser,
  changeUser,
};
