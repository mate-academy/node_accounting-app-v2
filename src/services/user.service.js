/* eslint-disable no-console */
const users = [];

function getAll() {
  return users;
}

function getById(id) {
  return users.find((user) => user.id === +id) || null;
}

function create(name) {
  const user = { id: users.length + 1, name };

  users.push(user);

  return user;
}

function deleteById(id) {
  const index = users.findIndex((user) => user.id === +id);

  if (index !== -1) {
    users.splice(index, 1);
  }
}

function update({ id, name }) {
  console.log(users);

  const user = users.find((person) => person.id === +id);

  return Object.assign(user, { name });
}

function resetUsers() {
  users.length = 0;
}

const usersService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  resetUsers,
};

module.exports = {
  usersService,
};
