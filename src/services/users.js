'use strict';

let users = [];

const getAll = () => users;

const getUserById = (userId) => {
  const foundedUser = users.find(user => user.id === +userId);

  return foundedUser || null;
};

const addUser = (name) => {
  const maxId = Math.max(...users.map(user => user.id));
  const id = users.length ? maxId + 1 : 0;

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const updateUser = (userId, name) => {
  const userToUpdate = getUserById(userId);

  const updatedUser = Object.assign(userToUpdate, { name });

  return updatedUser;
};

module.exports = {
  getAll,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
};
