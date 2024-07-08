let users = [];

const resetUsers = () => {
  users = [];
};

const findUserById = (id) => users.find((user) => user.id === id);

const generateUserId = () =>
  users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1;

const getUsers = () => users;

const createUser = (name) => {
  const newUser = { id: generateUserId(), name };

  users.push(newUser);

  return newUser;
};

const updateUser = (id, name) => {
  const user = findUserById(id);

  if (user) {
    user.name = name;
  }

  return user;
};

const deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);

    return true;
  }

  return false;
};

const reset = () => {
  users = [];
};

module.exports = {
  resetUsers,
  findUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  reset,
};
