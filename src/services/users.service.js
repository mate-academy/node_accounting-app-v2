const { generateId } = require('../helpers/generateId');
const { ERRORS } = require('../variables/variables');

let users = [];

const initUserService = () => {
  users = [];
};

const getUsers = () => {
  return users;
};

const createUser = (user) => {
  if (!user.name) {
    throw new Error(ERRORS.nameRequired);
  }

  const newUser = { ...user, id: generateId() };

  users.push(newUser);

  return newUser;
};

const getUserById = (id) => {
  if (!id) {
    throw new Error(ERRORS.idRequired);
  }

  const user = users.find((usr) => usr.id === id);

  if (!user) {
    throw new Error(ERRORS.userNotFound);
  }

  return user;
};

const deleteUser = (id) => {
  if (!id) {
    throw new Error(ERRORS.idRequired);
  }

  if (!users.length) {
    throw new Error(ERRORS.userNotFound);
  }

  users = users.filter((usr) => usr.id !== id);
};

const updateUser = (id, params) => {
  if (!id) {
    throw new Error(ERRORS.idRequired);
  }

  if (!params) {
    throw new Error(ERRORS.nameRequired);
  }

  let updatedUser = null;

  users = users.map((user) => {
    if (user.id === id) {
      updatedUser = { ...user, ...params };

      return updatedUser;
    }

    return user;
  });

  return updatedUser;
};

const usersService = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};

module.exports = {
  usersService,
  initUserService,
};
