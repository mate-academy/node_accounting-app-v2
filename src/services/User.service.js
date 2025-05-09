const { getAll, getById, deleteById } = require('../utils/helpers');

let nextUserId = 1;

const users = [];
const usersKeys = ['name'];

function resetUsers() {
  users.length = 0;
  nextUserId = 1;
}

async function getAllUsers() {
  return getAll(users);
}

async function getUserById(id) {
  return getById(users, id);
}

async function deleteUser(id) {
  return deleteById(users, id);
}

async function createUser(name) {
  const user = { id: nextUserId++, name };

  users.push(user);

  return user;
}

async function updateUser(id, data) {
  const user = users.find((usr) => usr.id === id);

  if (!user) {
    return null;
  }

  for (const key in data) {
    if (usersKeys.includes(key)) {
      user[key] = data[key];
    }
  }

  return user;
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
  resetUsers,
};
