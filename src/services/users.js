'use strict';

let users = [];

const initialUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (userId) => {
  const findedUser = users.find(user => user.id === Number(userId));

  return findedUser || null;
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

const updateUser = (findedUser, name) => {
  return Object.assign(findedUser, { name });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  initialUsers,
};
