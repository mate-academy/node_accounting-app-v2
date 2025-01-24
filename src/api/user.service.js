let users = [];

const clearUsers = () => {
  users = [];
};

const getUsers = () => users;

const createUser = (name) => {
  const id = users.length;
  const user = { id, name };

  users.push(user);

  return user;
};

const getUser = (userId) => {
  const foundUser = users.find((user) => user.id === userId);

  return foundUser;
};

const deleteUser = (userId) => {
  const index = users.findIndex((user) => user.id === userId);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);

  return true;
};

const updateUser = (userId, data) => {
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return null;
  }

  const updatedUser = { ...users[index], ...data };

  users[index] = updatedUser;

  return updatedUser;
};

const userService = {
  clearUsers,
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};

module.exports = { userService };
