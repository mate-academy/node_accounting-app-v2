'use strict';

function createUsersService() {
  const users = [];
  let lastId = 0;

  function createId() {
    const now = Date.now();

    lastId = now > lastId ? now : lastId + 1;

    return lastId;
  }

  function createUser(name) {
    const user = {
      id: createId(),
      name,
    };

    users.push(user);

    return user;
  }

  function getUsers() {
    return users;
  }

  function getUserById(id) {
    return users.find((user) => user.id === id) || null;
  }

  function updateUser(id, changes) {
    const user = getUserById(id);

    if (!user) {
      return null;
    }

    if (changes.name !== undefined) {
      user.name = changes.name;
    }

    return user;
  }

  function deleteUser(id) {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);

    return true;
  }

  return {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  };
}

module.exports = {
  createUsersService,
};
