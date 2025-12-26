'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === +id);
};

const createUser = (name) => {
  const maxId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  const userToCreate = {
    id: maxId,
    name,
  };

  users.push(userToCreate);

  return userToCreate;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const updateUser = (id, newName) => {
  const userId = users.find((user) => user.id === +id);

  if (!userId) {
    return null;
  }

  userId.name = newName;

  return userId;
};

const clear = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  clear,
};
