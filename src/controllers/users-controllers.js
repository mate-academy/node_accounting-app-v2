const {
  getUsersData,
  getOneUserData,
  addUser,
  removeUser,
  updateUserData,
} = require('../services/users-service');

const { STATUS_CODES } = require('../utils/constants');

const getUsers = (req, res) => {
  const users = getUsersData();

  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = getOneUserData(id);

  if (!user) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send(res.statusCode);
  } else {
    res.statusCode = STATUS_CODES.OK;
    res.send(user);
  }
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = STATUS_CODES.BAD_REQUEST;
    res.send(res.statusCode);

    return;
  }

  const user = addUser({ name });

  res.statusCode = STATUS_CODES.CREATED;
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const previousUsers = getUsersData();

  const newUsers = removeUser(id);

  if (previousUsers.length === newUsers.length) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send(res.statusCode);
  } else {
    res.statusCode = STATUS_CODES.NO_CONTENT;
    res.send(res.statusCode);
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = getOneUserData(id);

  if (!user) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send('User not found');
  } else {
    const updatedUser = updateUserData(user.id, name);

    res.send(updatedUser);
  }
};

module.exports = {
  getUserById,
  getUsers,
  postUser,
  deleteUser,
  updateUser,
};
