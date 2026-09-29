const users = [];

function clearUsers() {
  users.length = 0;
}

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser(newUser) {
  users.push(newUser);

  return newUser;
}

function deleteUser(id) {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return;
  }

  users.splice(userIndex, 1);
}

function updateUser({ id, name }) {
  const user = getUserById(id);

  if (!user) {
    return null;
  }

  return Object.assign(user, { id, name });
}

module.exports = {
  clearUsers,
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
