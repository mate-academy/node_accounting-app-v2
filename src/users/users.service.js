let users = [];
let lastId = 0;

function resetUsers() {
  users = [];
  lastId = 0;
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function create({ name }) {
  lastId += 1;

  const newUser = { id: lastId, name };

  users.push(newUser);

  return newUser;
}

function update(id, changes) {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = { ...users[userIndex], ...changes };

  return users[userIndex];
}

function remove(id) {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);

  return true;
}

module.exports = {
  resetUsers,
  getAll,
  getById,
  create,
  update,
  remove,
};
