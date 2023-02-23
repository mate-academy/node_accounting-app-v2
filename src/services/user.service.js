'use strict';

let users = [];

const getAll = () => users;

const create = (options) => {
  const maxId = users.length
    ? Math.max(...users.map(({ id }) => id))
    : 0;

  const newUser = {
    id: maxId + 1,
    ...options,
  };

  users.push(newUser);

  return newUser;
};

const findById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const update = ({ id, name }) => {
  const user = findById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  userService: {
    getAll,
    create,
    findById,
    remove,
    update,
  },
};
