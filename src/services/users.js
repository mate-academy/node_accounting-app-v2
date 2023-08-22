'use strict';

let users = [];
let currentId = 1;

const getUsers = () => {
  return users;
};

const getUser = (userId) => {
  const foundUser = users.find(
    user => user.id === +userId
  );

  return foundUser || null;
};

const createUser = ({
  name,
}) => {
  const newUser = {
    id: currentId,
    name,
  };

  users.push(newUser);
  currentId++;

  return newUser;
};

const updateUser = (userId, name) => {
  const user = getUser(userId);

  Object.assign(user, { name });

  return user;
};

const deleteUser = (userId) => {
  users = users.filter(
    user => user.id !== +userId
  );
};

const removeAll = () => {
  users = [];
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  removeAll,
};
