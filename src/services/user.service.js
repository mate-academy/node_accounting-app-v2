const { getId, parseId } = require('../utils/getId');

let users = [];

const reset = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getOne = (id) => {
  return users.find((user) => user.id === parseId(id));
};

const create = (name) => {
  const newUser = {
    id: getId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, newName) => {
  const user = getOne(id);

  if (user) {
    user.name = newName;
  }

  return user;
};

const remove = (id) => {
  const prevLen = users.length;

  users = users.filter((user) => user.id !== parseId(id));

  return users.length < prevLen;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  reset,
};
