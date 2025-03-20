const { requiredFields } = require('../types/user-type');
const { validFields } = require('../utils/validFields');

let storeUsers = [];

const createUserService = (user) => {
  const errors = validFields(user, requiredFields);

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  const newUser = {
    id: storeUsers.length + 1,
    ...user,
  };

  storeUsers.push(newUser);

  return newUser;
};

const getAllUsersService = () => storeUsers;

const getUserByIdService = (id) => {
  const user = storeUsers.find((item) => item.id === id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const updateUserService = (id, updateUser) => {
  const user = getUserByIdService(id);

  const filterUpdateUserFields = requiredFields.map(
    (field) => Object.keys(field)[0],
  );

  Object.keys(updateUser).forEach((field) => {
    if (!filterUpdateUserFields.includes(field)) {
      delete updateUser[field];
    }
  });

  const errors = validFields(updateUser, requiredFields);

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  Object.assign(user, updateUser);

  return user;
};

const deleteUserService = (id) => {
  const user = getUserByIdService(id);

  storeUsers = storeUsers.filter((item) => item.id !== user.id);
};

const resetUsersService = () => {
  storeUsers = [];
};

module.exports = {
  createUserService,
  getAllUsersService,

  getUserByIdService,
  updateUserService,
  deleteUserService,

  resetUsersService,
  storeUsers,
};
