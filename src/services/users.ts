'use strict';

let users:any[] = [];

const getAll = () => {
  return users;
};


const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const createUser = (name) => {
  const maxId = Math.max(...users.map(user => user.id)) || 0;

  const newUser = {
    id: maxId + 1,
    name,
  }

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const update = (userId, newName) => {
  const foundUser = getById(userId);

  Object.assign(foundUser, { name: newName });

  return foundUser;
};

module.exports = {
  getAll,
  getById,
  createUser,
  deleteUser,
  update,
};
