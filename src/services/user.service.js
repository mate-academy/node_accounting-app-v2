'use strict';

let users = [];

const get = () => {
  return users;
};

const getById = (id) => {
  return users.find(us => +us.id === +id) || null;
};

const create = (name) => {
  const user = {
    name,
    id: new Date().getTime(),
  };

  users.push(user);

  return user;
};

const update = (id, name) => {
  const user = getById(id);

  if (user) {
    Object.assign(user, { name });

    return user;
  }
};

const remove = (id) => {
  users = users.filter(user => user.id !== +id);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
