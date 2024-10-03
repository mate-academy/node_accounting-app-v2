const { data } = require('./data');

function getAllUsers() {
  return data.users;
}

function addUser(userName) {
  const newUser = { id: Math.random(), name: userName };

  data.users.push(newUser);

  return newUser;
}

function getUser(userId) {
  const neededUser = data.users.find((user) => user.id === +userId);

  if (!neededUser) {
    return null;
  }

  return neededUser;
}

function deleteUser(userId) {
  const neededIndex = data.users.findIndex((user) => user.id === +userId);

  if (neededIndex === -1) {
    return null;
  }

  const [deletedUser] = data.users.splice(neededIndex, 1);

  return deletedUser;
}

function updateUser(userId, userName) {
  const neededUser = data.users.find((user) => user.id === +userId);

  if (!neededUser) {
    return null;
  }

  return Object.assign(neededUser, { name: userName });
}

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
};
