'use strict';

let users = [];

const initialUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
};

const addUser = (name) => {
  let newUser = {};

  if (!users.length) {
    newUser = {
      id: 0,
      name,
    };
  } else {
    const maxId = Math.max(...users.map(user => user.id));

    newUser = {
      id: maxId + 1,
      name,
    };
  }

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== Number(userId));
};

const updateUser = (foundUser, name) => {
  return Object.assign(foundUser, { name });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  initialUsers,
};
