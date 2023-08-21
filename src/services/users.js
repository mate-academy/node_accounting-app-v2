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

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (userId) => {
  users = users.filter(
    user => user.id !== +userId
  );
};

const removeAll = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll,
};
