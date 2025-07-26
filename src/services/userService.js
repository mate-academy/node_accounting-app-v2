let users = [];
let nextId = 1;

function getUsers() {
  return [...users];
}

function getUserById(id) {
  return users.find((user) => user.id === Number(id)) || null;
}

function createUser({ name }) {
  const newUser = {
    id: nextId++,
    name,
  };

  users.push(newUser);

  return newUser;
}

function updateUser(id, { name }) {
  const user = getUserById(id);

  if (!user) {
    return null;
  }

  user.name = name ?? user.name;

  return user;
}

function deleteUser(id) {
  users = users.filter((user) => user.id !== Number(id));
}

function reset() {
  users = [];
  nextId = 1;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  reset,
};
