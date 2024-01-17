'use strict';

let users = [];
let userIds = 1;
const findAllUsers = () => users;

const findUserById = (id) => {
  return users.find((user) => user.id === +id);
};

const createUser = (name) => {
  const newUser = {
    id: userIds,
    name,
  };

  users.push(newUser);
  userIds++;

  return newUser;
};

const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === +id);

  if (index !== -1) {
    users.splice(index, 1);
  }
};

const updateUser = ({ id, name }) => {
  const user = findUserById(id);

  if (!user) {
    return null;
  }

  user.name = name;

  return user;
};

const resetUsers = () => {
  users = [];
  userIds = 1;
}

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  deleteUser,
  updateUser,
  resetUsers,
};
