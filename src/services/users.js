'use strict';

let users = [
  // {
  //   id: 1, name: 'Max',
  // },
  // {
  //   id: 2, name: 'Vadim',
  // },
  // {
  //   id: 3, name: 'Katya',
  // },
  // {
  //   id: 4, name: 'Tanya',
  // },
];

function getAll() {
  return users;
}

function findById(userId) {
  return users.find(({ id }) => id === +userId);
}

function create(name) {
  const nextId = users
    .reduce((prev, cur) => prev.id > cur.id ? prev : cur).id + 1;

  const newUser = {
    id: nextId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function change(userId, name) {
  users = users.map(user => {
    if (user.id === +userId) {
      user.name = name;
    }

    return user;
  });
}

module.exports = {
  getAll,
  findById,
  create,
  remove,
  change,
};
