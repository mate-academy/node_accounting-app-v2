const usersData = require('../resources/usersData');
const { users, userCount } = usersData;

const getAllUsers = () => {
  return users;
};

const getOneUser = (id) => {
  return users.find((u) => u.id === id) || null;
};

const createUser = (userData) => {
  const newUser = {
    id: userCount(),
    ...userData,
  };

  users.push(newUser);
  usersData.incrementCount();

  return newUser;
};

const updateUser = (id, paramsToUpdate) => {
  const userToUpdate = users.find((u) => u.id === id);

  if (!userToUpdate) {
    return null;
  }

  Object.assign(userToUpdate, paramsToUpdate);

  return userToUpdate;
};

const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return null;
  }

  const deletedUser = users.splice(index, 1);

  return deletedUser[0];
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
