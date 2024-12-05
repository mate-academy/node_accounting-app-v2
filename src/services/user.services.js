let users = [];
let nextId = 1;

const resetUsers = () => {
  users = [];
  nextId = 1;
};

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const createUser = (name) => {
  const user = { id: nextId++, name };

  users.push(user);

  return user;
};

const deleteUserById = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedUser] = users.splice(index, 1);

  return deletedUser;
};

const updateUserById = ({ id, name }) => {
  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    return;
  }

  return Object.assign(foundUser, { name });
};

const usersService = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};

module.exports = {
  usersService,
  resetUsers,
};
