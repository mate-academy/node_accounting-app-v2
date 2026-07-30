const { generateAnyIdNumber } = require('../../helpers');

let users = [];

function reset() {
  users = [];
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === Number(id));
}

function create(name) {
  const user = { id: generateAnyIdNumber(), name };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) {
    return null;
  }

  const [user] = users.splice(index, 1);

  return user;
}

function update({ id, name }) {
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
}

module.exports = {
  reset,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
