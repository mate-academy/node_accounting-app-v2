'use strict';

let users = [];

function init() {
  users = [];
};

function getAll() {
  return users;
};

function getbyId(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
};

function update({ id, name }) {
  const user = getbyId(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  init,
  getAll,
  getbyId,
  create,
  remove,
  update,
};
