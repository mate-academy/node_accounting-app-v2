'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getOne = (userId) => {
  return users.find(user => user.id === Number(userId));
};

const create = (name) => {
  const newUser = {
    id: Math.floor(Math.random() * 10000),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== Number(userId));
};

const update = (userId, newName) => {
  users = users.map(user => {
    if (user.id === Number(userId)) {
      return {
        ...user,
        name: newName,
      };
    } else {
      return user;
    }
  });

  return users.find(user => user.id === Number(userId));
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
  clearUsers,
};
