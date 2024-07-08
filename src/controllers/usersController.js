const User = require('./User');
const { mockUsers } = require('./data');

const getUsers = () => [...mockUsers.values()];

const getUserById = (id) => mockUsers.get(id);

const addUser = (name) => {
  const maxId = Math.max(...mockUsers.keys(), 0);
  const newId = maxId + 1;
  const newUser = new User(newId, name);

  mockUsers.set(newId, newUser);

  return newUser;
};

const deleteUserById = (id) => {
  const deletedUser = mockUsers.get(id);

  mockUsers.delete(id);

  return deletedUser;
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deleteUserById,
};
