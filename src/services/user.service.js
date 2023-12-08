'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [
  // {
  //   id: '1',
  //   name: 'Alex',
  // },
  // {
  //   id: '2',
  //   name: 'Julia',
  // },
];

const getAll = () => users;

const getById = (id) => {
  return users.find((usr) => usr.id === id) || null;
};

const create = (name) => {
  const newUser = {
    id: uuidv4(),
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
  users = users.filter((usr) => usr.id !== id) || null;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
