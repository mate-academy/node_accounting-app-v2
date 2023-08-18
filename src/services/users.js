'use strict';

let users = [];
let currentId = 1;

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(
    user => user.id === +userId
  );

  return foundUser || null;
};

const create = (name) => {
  const newUser = {
    id: currentId,
    name,
  };

  users.push(newUser);
  currentId++;

  return newUser;
};

const remove = (userId) => {
  users = users.filter(
    user => user.id !== +userId
  );
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const removeAll = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeAll,
};
