const {
  getUsersData,
  getOneUserData,
  getNewId,
  addUser,
  removeUser,
  setNewUsers,
  updateUserData,
} = require('../services/users-service');

const getUsers = (req, res) => {
  const users = getUsersData();

  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = getOneUserData(id);

  if (!user) {
    res.statusCode = 404;
    res.send(res.statusCode);
  } else {
    res.statusCode = 200;
    res.send(user);
  }
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send(res.statusCode);

    return;
  }

  const user = {
    id: getNewId(),
    name,
  };

  addUser(user);
  res.statusCode = 201;
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const newUsers = removeUser(id);

  if (getUsersData().length === newUsers.length) {
    res.statusCode = 404;
    res.send(res.statusCode);
  } else {
    setNewUsers(newUsers);
    res.statusCode = 204;
    res.send(res.statusCode);
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = getOneUserData(id);

  if (!user) {
    res.statusCode = 404;
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
