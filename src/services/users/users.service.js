let users = [];

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id) || null;
}

function create(name) {
  const user = { id: generateId(), name };

  users.push(user);

  return user;
}

function deleteById(id) {
  if (!getById(id)) {
    return;
  }

  users = users.filter((user) => user.id !== id);
}

function update(userData) {
  const user = getById(userData.id);

  Object.assign(user, { name: userData.name });

  return user;
}

function generateId() {
  if (users.length) {
    return Math.max(...users.map((user) => user.id)) + 1;
  }

  return 1;
}

function clean() {
  users = [];
}

module.exports = {
  usersService: {
    getAll,
    getById,
    create,
    deleteById,
    update,
    clean,
  },
};
