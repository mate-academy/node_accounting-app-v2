let users = [];

function cleanUsersData() {
  return (users = []);
}

function getAll() {
  return users;
}

function getUserById(id) {
  return users.find((user) => +user.id === +id);
}

function createUser(name) {
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const newUser = { id, name };

  users.push(newUser);

  return newUser;
}

function updateUser({ id, name }) {
  const userToUpdate = users.find((user) => +user.id === +id);

  if (!userToUpdate) {
    return;
  }

  return Object.assign(userToUpdate, { name });
}

function deleteUser(id) {
  const index = users.findIndex((user) => +user.id === +id);

  if (index === -1) {
    return;
  }

  const [userDeleted] = users.splice(index, 1);

  return userDeleted;
}

const usersServices = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = {
  cleanUsersData,
  usersServices,
};
