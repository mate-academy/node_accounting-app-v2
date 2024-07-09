'use strict';

const users = [];

const init = () => {
  users.length = 0;
};

const getAll = () => {
  return users;
};

const getUserById = (id) => {
  const choosedUser = users.find((user) => user.id === +id);

  return choosedUser;
};

const create = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ id, name }) => {
  return Object.assign(getUserById(id), { name });
};

const remove = (id) => {
  const index = users.findIndex((user) => user.id === +id);

  if (index > -1) {
    users.splice(index, 1);
  }
};

module.exports = {
  init,
  getAll,
  getUserById,
  create,
  update,
  remove,
};
