'use strict';

let users = [];

const readAll = () => {
  return users;
};

const read = (id) => {
  return users.find(user => user.id === id);
};

const create = ({ name }) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = (id, params) => {
  const user = read(id);

  return Object.assign(user, {
    id, ...params,
  });
};

module.exports = {
  readAll,
  read,
  create,
  remove,
  update,
};
