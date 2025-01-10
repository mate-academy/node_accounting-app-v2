let users = [];

function clearUsers() {
  users = [];
}

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser(name) {
  const id = Date.now();
  const newUser = {
    id: id,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return null;
  }

  return users.splice(userIndex, 1)[0];
}

function updateUser(userId, updatedUser) {
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...updatedUser,
    };

    return users[userIndex];
  }

  return null;
}

const usersService = {
  clearUsers,
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = usersService;
