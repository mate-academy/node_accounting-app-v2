'use strict';

const START_ID = 100;

let currId = START_ID;
let users = [];

const getAll = () => users;

const create = ({ name }) => {
  const user = { id: currId++, name };

  users.push(user);

  return user;
};

const getById = (id) => {
  const user = users.find((currentUser) => currentUser.id === Number(id));

  return user ?? null;
};

const remove = (id) => {
  const newUsers = users.filter((currentUser) => currentUser.id !== Number(id));

  users = newUsers;

  return users;
};

const update = ({ id, name }) => {
  const user = getById(id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
};

const reset = () => {
  users = [];
  currId = START_ID;
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  reset,
};
