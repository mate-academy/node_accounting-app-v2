const users = require('../data/users');
const generateId = require('../utils/randomNum');

function getAllUsers() {
  return users;
}

function createUser(name) {
  const newUser = {
    id: generateId(),
    name: name,
  };

  users.push(newUser);

  return newUser;
}

function getUserById(id) {
  return users.find((user) => user.id === Number(id));
}

function removeUser(id) {
  const index = users.findIndex((user) => user.id === Number(id));

  if (index === -1) {
    return null;
  }

  users.splice(index, 1);

  return true;
}

function updateUser({ id, name }) {
  const user = getUserById(Number(id));

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
};
