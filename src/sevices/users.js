'use strict';

let users = [{
  id: 1,
  name: 'some',
}];

const getAll = () => {
  return users;
};

const getUserById = (userId) => {
  return users.find(user => user.id === +userId);
};

const createUser = (name) => {
  const maxId = users.length === 0
    ? 0
    : Math.max(...users.map(user => user.id));

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = (userId, newName) => {
  const foundUser = getUserById(userId);

  Object.assign(foundUser, { name: newName });

  return foundUser;
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
