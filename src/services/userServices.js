'use strict';

const users = [];
const userId = 0;

const newUser = (userName, id) => {
  const user = {
    id: ++id,
    name: userName,
  };

  return user;
};

const foundUser = (bodyName, allUsers) => {
  return allUsers.find(user => user.name === bodyName);
};

const wantedUser = (allUsers, id) => {
  return allUsers.find(user => user.id === +id);
};

const changedUserIndex = (allUsers, id) => {
  return allUsers.findIndex(obj => obj.id === +id);
};

const deletedUserIndex = (allUsers, id) => {
  return allUsers.findIndex(obj => obj.id === +id);
};

module.exports = {
  users,
  userId,
  newUser,
  foundUser,
  wantedUser,
  changedUserIndex,
  deletedUserIndex,
};
