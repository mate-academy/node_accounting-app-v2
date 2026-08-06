function createUsersService(users) {
  let currentUserId = 0;
  const nextUserId = () => ++currentUserId;

  function getAllUsers() {
    return users;
  }

  function createUser(name) {
    const newUser = { name, id: nextUserId() };

    users.push(newUser);

    return newUser;
  }

  function getUserById(userId) {
    return users.find((u) => userId === u.id);
  }

  function deleteUser(userId) {
    const index = users.findIndex((user) => user.id === userId);

    if (index === -1) {
      return false;
    }
    users.splice(index, 1);

    return true;
  }

  function updateUser(userId, changes) {
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return null;
    }

    Object.assign(user, changes);

    return user;
  }

  return {
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
  };
}

module.exports = {
  createUsersService,
};
