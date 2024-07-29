const { generateRandomId } = require('../utils/generateRandomId');

let users = [];

const allUsers = () => {
  return users;
};

const userById = (id) => {
  return users.find((user) => user.id === +id);
};

const createUser = (name) => {
  const newUser = {
    id: generateRandomId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = ({ id, name }) => {
  const user = userById(id);

  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const resetAllUsers = () => {
  users = [];
};

module.exports = {
  allUsers,
  userById,
  createUser,
  updateUser,
  deleteUser,
  resetAllUsers,
};
