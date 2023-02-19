'use strict';

const users = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Jane Doe',
  },
  {
    id: 3,
    name: 'John Smith',
  },
  {
    id: 4,
    name: 'Jane Smith',
  },
];

const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id) || null;

const addUser = (name) => {
  const newUser = {
    name,
    id: Math.max(...users.map((user) => user.id)) + 1,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (id) => {
  const user = getUserById(id);

  if (user) {
    users.filter((u) => u.id !== id);
  }
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  if (user) {
    user.name = name;
  }

  return user;
};

module.exports = {
  getUsers,
  getUserById,
  removeUser,
  addUser,
  updateUser,
};
