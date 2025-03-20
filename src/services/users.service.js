'use strict';

let users = [];

const reset = () => (users = []);

const getAll = () => users;
const getById = (id) => users.find((user) => user.id === id);

const create = (name) => {
  const id = users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  const newUser = { id, name };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  const newUsers = users.filter((user) => user.id !== id);

  if (newUsers.length === users.length) {
    return false;
  }

  users = newUsers;

  return true;
};

const update = (id, name) => {
  const user = getById(id);

  if (!user) {
    return;
  }

  user.name = name;

  return user;
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  remove,
  update,
};
