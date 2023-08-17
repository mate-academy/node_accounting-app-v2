'use strict';

let users = [];

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
  const ids = users.map(user => user.id);
  const newId = Math.max(ids) + 1;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

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
