const { generateRandomId } = require('../utils/generateRandomId');

let users = [];

const getAllUsersService = () => {
  return users;
};

const createNewUserService = (name) => {
  const newUser = { name, id: generateRandomId() };

  users.push(newUser);

  return newUser;
};

const getUserByIdService = (id) => {
  return users.find((user) => user.id === +id);
};

const deleteUserByIdService = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const updateUserByIdService = (id, name) => {
  const user = getUserByIdService(id);

  Object.assign(user, { name });

  return user;
};

const usersReset = () => (users = []);

module.exports = {
  getAllUsersService,
  createNewUserService,
  getUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
  usersReset,
};
