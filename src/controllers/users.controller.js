const status = require('../constants/httpStatusCodes');
const usersService = require('../services/users.service');

const getAllUsers = (req, res) => {
  res.send(usersService.getAllUsers());
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(Number(id));

  if (!user) {
    res.sendStatus(status.notFound);
  }

  res.statusCode = status.successful;
  res.send(user);
};

const createNewUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(status.badRequest);
  }

  const user = usersService.createUser(name);

  res.statusCode = status.created;

  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(Number(id));

  if (!user) {
    res.sendStatus(status.notFound);

    return;
  }

  usersService.removeUser(id);

  res.sendStatus(status.noContent);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getUserById(Number(id));

  if (!user) {
    res.sendStatus(status.badRequest);
  }

  if (typeof name !== 'string') {
    res.status(status.unprocessableEntity);
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
