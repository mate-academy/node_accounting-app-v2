const { generateId } = require('../utils/generateId');
const users = [];

function clearUsers() {
  users.length = 0;
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function create(name) {
  const user = { id: generateId(), name };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return;
  }

  const [deletedUser] = users.splice(index, 1);

  return deletedUser;
}

function update(id, name) {
  const usertoUpdate = users.find((user) => user.id === id);

  if (!usertoUpdate) {
    return;
  }

  return Object.assign(usertoUpdate, { name });
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  clearUsers,
};
