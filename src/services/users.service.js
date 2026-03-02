let users = [];
let userIdCounter = 1;

function resetUsers() {
  users = [];
  userIdCounter = 1;
}

function getUsers() {
  return users;
}

function createUser(name) {
  const user = {
    id: userIdCounter++,
    name,
  };

  users.push(user);

  return user;
}

function getUserById(id) {
  return users.find((u) => u.id === id) || null;
}

function deleteUserById(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return null;
  }

  return users.splice(index, 1)[0];
}

function updateUserById(id, data) {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  Object.assign(user, data);

  return user;
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  resetUsers,
};
