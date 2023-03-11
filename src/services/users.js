'use strict';

let users = [];

function initiate(initiateValue) {
  users = initiateValue;
}

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const id = !users.length
    ? 0
    : Math.max(...users.map(user => user.id)) + 1;

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  const filteredUsers = users.filter(user => user.id !== +userId);

  users = filteredUsers;
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = ({
  initiate,
  getAll,
  getById,
  create,
  remove,
  update,
});
