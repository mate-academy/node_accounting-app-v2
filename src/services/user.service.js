'use strict';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let users = [
  {
    id: 1, name: 'Oleh',
  },
];

const clearUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const createUser = (name) => {
  const newUser = {
    id: getRandomInt(9000),
    name: name,
  };

  users.push(newUser);

  return newUser;
};

const getUserById = (id) => {
  return users.find(user => user.id === id) || null;
};

const deleteUserById = (id) => {
  const user = users.find(person => person.id === id) || null;

  if (!user) {
    return null;
  }

  users = users.filter(person => person.id !== id);

  return user;
};

const updateUserById = (id, fields) => {
  const user = users.find(person => person.id === id) || null;

  if (!user) {
    return null;
  }

  Object.assign(user, fields);

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  clearUsers,
};
