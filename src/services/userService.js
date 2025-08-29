/* eslint-disable no-shadow */
let users = [];

let nextId = 1;

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function create(name) {
  const user = {
    id: nextId++,
    name,
  };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return;

  const [user] = users.splice(index, 1);

  return user;
}

function update({ id, name }) {
  const user = users.find((user) => user.id === id);

  if (!user) return;

  return Object.assign(user, {
    name,
  });
}

function clear() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  clear,
};
