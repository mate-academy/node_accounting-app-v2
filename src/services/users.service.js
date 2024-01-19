'use strict';

let users = [
  {
    id: 1,
    name: 'Alejandro',
  },
  {
    id: 2,
    name: 'Isabella',
  },
  {
    id: 3,
    name: 'Carlos',
  },
  {
    id: 4,
    name: 'Sofia',
  },
  {
    id: 5,
    name: 'Diego',
  },
  {
    id: 6,
    name: 'Valentina',
  },
  {
    id: 7,
    name: 'Javier',
  },
  {
    id: 8,
    name: 'Camila',
  },
  {
    id: 9,
    name: 'Mateo',
  },
  {
    id: 10,
    name: 'Luna',
  },
];

const getAllUsers = () => {
  return users;
};

const getUser = (userId) => {
  return users.find(({ id }) => id === +userId);
};

const createUserId = () => {
  const ids = users.map(person => person.id);

  return Math.max(...ids) + 1;
};

const addUser = (user) => {
  users.push(user);
};

const removeUser = (userId) => {
  users = users.filter(({ id }) => userId !== +id);
};

const updateUser = (userId, name) => {
  return Object.assign(getUser(userId), { name });
};

module.exports = {
  users,
  getAllUsers,
  getUser,
  createUserId,
  addUser,
  removeUser,
  updateUser,
};
