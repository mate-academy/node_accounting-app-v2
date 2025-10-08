const { v4: uuidv4 } = require('uuid');

const users = [];

function getAllUsers() {
  return users;
}

function getSingleUser(id) {
  return users.find((u) => u.id === id);
}

function addUser(name) {
  const user = { id: uuidv4(), name };

  users.push(user);

  return user;
}

function removeUser(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

function updateUser({ id, name }) {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { id, name });
}

module.exports = {
  userService: {
    getAllUsers,
    getSingleUser,
    addUser,
    removeUser,
    updateUser,
  },
};
