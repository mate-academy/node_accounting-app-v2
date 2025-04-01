const users = [];

function resetUsers() {
  users.length = 0;
}

const getId = () => {
  const maxId = users.length ? Math.max(...users.map((u) => u.id)) : 0;

  return maxId + 1;
};

// GET:/users
function getAllUsers() {
  return users;
}

// GET:/users/:userId
function getById(id) {
  return users.find((u) => u.id === id);
}

// POST: /users
function createUser(name) {
  const user = { id: getId(), name };

  users.push(user);

  return user;
}

// DELETE : /users/:userId
function deleteUserById(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

// PATCH : /users/:userId
function updateUser(userData) {
  const user = getById(userData.id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name: userData.name });
}

const userService = {
  resetUsers,
  getAllUsers,
  getById,
  createUser,
  deleteUserById,
  updateUser,
};

module.exports = userService;
