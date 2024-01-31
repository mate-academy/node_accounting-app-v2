'use strict';

let users = [];

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => users;

const getUserById = (userID) => users.find((el) => el.id === +userID);

const createUser = (name) => {
  if (!name) {
    return null;
  }

  const user = {
    id: users.length,
    name,
  };

  users.push(user);

  return user;
};

const deleteUser = (userID) => {
  const index = users.findIndex((el) => el.id === +userID);

  if (index === -1) {
    return false;
  }
  users.splice(index, 1);

  return true;
};

const updateUser = (userID, name) => {
  const index = users.findIndex((el) => el.id === +userID);

  if (index === -1 || !name) {
    return null;
  }

  const user = users[index];

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  createUser,
  resetUsers,
};
