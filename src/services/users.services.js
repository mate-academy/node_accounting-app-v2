let users = [];
let currentId = 1;

const initUsers = () => {
  users = [];
};

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser(name) {
  const newUser = {
    id: currentId++,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);

  return true;
}

function updateUser(id, name) {
  const currentUser = users.find((user) => user.id === id);

  if (!currentUser) {
    return null;
  }
  currentUser.name = name;

  return currentUser;
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  initUsers,
};
