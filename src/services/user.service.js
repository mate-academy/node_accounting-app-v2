'use strict';

function createUserService() {
  const users = [];
  let nextUserId = 1;

  const getAllUsers = () => {
    return users;
  };

  const getUserById = (userId) => {
    return users.find((user) => user.id === Number(userId)) || null;
  };

  const createUser = (name) => {
    const user = {
      id: nextUserId++,
      name,
    };

    users.push(user);

    return user;
  };

  const removeUser = (userId) => {
    const index = users.findIndex((user) => user.id === Number(userId));

    if (index === -1) {
      return false;
    }

    users.splice(index, 1);

    return true;
  };

  const updateUser = (userId, name) => {
    const user = getUserById(userId);

    if (!user) {
      return null;
    }

    user.name = name;

    return user;
  };

  return {
    getAllUsers,
    getUserById,
    createUser,
    removeUser,
    updateUser,
  };
}

module.exports = createUserService;
