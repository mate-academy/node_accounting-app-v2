'use strict';

const users = [];

const init = () => {
  users.length = 0;
};

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  return users.find((user) => user.id === +userId);
};

const addUser = (name) => {
  const createdUser = {
    id: users.length + 1,
    name,
  };

  users.push(createdUser);

  return createdUser;
};

const updateUserName = ({ id, name }) => {
  return Object.assign(getUserById(id), { name });
};

const deleteUser = (id) => {
  const foundedIndex = users.findIndex((user) => user.id === +id);

  if (foundedIndex > -1) {
    users.splice(foundedIndex, 1);
  }
};

module.exports = {
  init,
  getAllUsers,
  getUserById,
  addUser,
  updateUserName,
  deleteUser,
};
