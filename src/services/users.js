'use strict';

const userServices = {
};

userServices.newLocaleStorage = function() {
  this.users = [];
};

userServices.getAllUsers = () => {
  return userServices.users;
};

userServices.getUserById = (id) => {
  const query = Number(id);
  const foundUser = userServices.users.find((user) => user.id === query);

  return foundUser;
};

userServices.addUser = (name) => {
  const id = userServices.users.length;

  const newUser = {
    id,
    name,
  };

  userServices.users.push(newUser);

  return newUser;
};

userServices.removeUserById = (id) => {
  const searchId = Number(id);

  userServices.users.splice(userServices.users
    .findIndex((user) => user.id === searchId), 1);
};

userServices.updateUserById = (
  id,
  updatedFields,
) => {
  const userToUpdate = userServices.getUserById(id);

  if (!userToUpdate) {
    return null;
  }

  Object.assign(userToUpdate, updatedFields);

  return userToUpdate;
};

module.exports = {
  userServices,
};
