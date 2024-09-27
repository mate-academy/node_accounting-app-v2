'use strict';

let users = [];

const resetUsers = () => {
  users = [];
};

const findUserById = (id) => (
  users.find(findUser => findUser.id === +id) || null
);

const getNewId = () => {
  return Math.max(users.map(e => e.id)) + 1;
};

function getAll() {
  return users;
}

function create(newUserName) {
  const newUser = {
    id: getNewId(users),
    name: newUserName,
  };

  users.push(newUser);

  return newUser;
}

function remove(id) {
  users = users.filter(filterUser => filterUser.id !== id);
}

module.exports = {
  getAll,
  findUserById: findUserById,
  resetUsers,
  create,
  remove,
};
