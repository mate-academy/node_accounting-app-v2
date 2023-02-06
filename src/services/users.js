'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [
  {
    id: 0, title: 'John',
  },
  {
    id: 1, title: 'Mike',
  },
];

function getAll() {
  return users;
}

function getById(userId) {
  return users.find(user => user.id === +userId);
}

function create(name) {
  const user = {
    id: uuidv4(),
    name,
  };

  users.push(user);

  return user;
}

function update(user, name) {
  Object.assign(user, { name });
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

module.exports = {
  getAll, getById, create, update, remove, users,
};
