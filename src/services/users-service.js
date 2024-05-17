const { findItemById, getId, getFilteredArray } = require('../services/helper');

let users = [];

const clearUsersData = () => {
  users = [];
};

const getUsersData = () => {
  return users;
};

const getOneUserData = (id) => {
  return findItemById(users, id);
};

const getNewId = () => {
  return getId(users);
};

const addUser = (user) => {
  users.push(user);
};

const removeUser = (id) => {
  return getFilteredArray(users, id);
};

const updateUserData = (userId, newName) => {
  users = users.map((user) => {
    if (String(user.id) === String(userId)) {
      return {
        ...user,
        name: newName,
      };
    }

    return user;
  });

  return getOneUserData(userId);
};

const setNewUsers = (newUsers) => {
  users = newUsers;
};

module.exports = {
  getUsersData,
  getOneUserData,
  getNewId,
  addUser,
  removeUser,
  setNewUsers,
  updateUserData,
  clearUsersData,
};
