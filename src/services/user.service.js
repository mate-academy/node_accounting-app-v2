/* eslint-disable */
// const { v4: uuidv4 } = require('uuid');
let nextId = 1;

// let users = [
//   { id: 1, name: 'Andriï' },
//   { id: 2, name: 'Laeti' },
//   { id: 3, name: 'Mimi' },
// ];

let users = [];

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === +id) || null;
}

function create(name) {
  const user = {
    name,
    id: nextId++,
  };

  users.push(user);

  return user;
}

function update({ id, name }) {
  const user = getById(id);
  Object.assign(user, { name });

  return user;
}

function remove(id) {
  users = users.filter((user) => user.id !== +id);
}

function reset() {
  users = [];
  nextId = 1;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
