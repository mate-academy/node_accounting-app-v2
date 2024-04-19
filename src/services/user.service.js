'use strict';

let users = [];

const userInit = () => {
  users = [];
};

const readAll = () => users;

const read = (id) => {
  return users.find((user) => user.id === id) || null;
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
  users = users.filter((user) => user.id !== id);
};

const update = (id, fields) => Object.assign(read(id), { ...fields });

module.exports = {
  userInit,
  readAll,
  read,
  create,
  remove,
  update,
};
