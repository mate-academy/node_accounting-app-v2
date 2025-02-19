const usersServ = require('../services/users.service');
const statusCode = require('../utils/statusCode');

const getAllUsers = (req, res) => {
  res.status = statusCode.OK;
  res.send(usersServ.allUsers());
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const user = usersServ.userById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  res.status(statusCode.OK).send(user);
};

const getCreateUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const user = usersServ.createUser(name);

  res.status(statusCode.CREATED).send(user);
};

const getDeleteUser = (req, res) => {
  const { id } = req.params;

  const user = usersServ.userById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  usersServ.deleteUser(id);
  res.sendStatus(statusCode.NO_CONTENT);
};

const getUpdateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersServ.userById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  usersServ.updateUser(id, name);
  res.status(statusCode.OK).send(user);
};

module.exports = {
  getAllUsers,
  getUserById,
  getCreateUser,
  getDeleteUser,
  getUpdateUser,
};
