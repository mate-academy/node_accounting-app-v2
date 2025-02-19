'use strict';

let users = [];

function resetUsers() {
  users = [];
}

const getAllUsers = () => users;

const getUserById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const createUser = (name) => {
  const newUser = {
    id: users.length,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

const updateUsers = (id, name) => {
  const foundUser = getUserById(id);

  const updatedUser = {
    ...foundUser, name,
  };

  users = users.map(user => (user
    .id === foundUser.id ? updatedUser : user));

  return updatedUser;
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUsers,
};
