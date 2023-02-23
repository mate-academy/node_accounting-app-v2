const { generateId } = require('../helpers/generateId');

let users = [];

function setInitialUsers() {
  users = [];
};

function getAll() {
  return users;
}

function findById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: generateId(users),
    name: name,
  }

  users.push(newUser);
  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function update(userId, name) {
  const user = findById(userId);

  if (user) {
    Object.assign(user, { name });
  }

  return user;
}

module.exports = {
  setInitialUsers,
  getAll,
  findById,
  create,
  remove,
  update,
};
