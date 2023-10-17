'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(({ id: userId }) => +userId === +id);
};

const create = (name) => {
  const newUser = {
    id: +new Date(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter(({ id: userId }) => +userId !== +id);
};

const removeAll = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll,
};
