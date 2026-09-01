'use strict';

let users = [];
let NextId = 0;

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const create = (name) => {
  const NewUser = {
    id: NextId++,
    name,
  };

  users.push(NewUser);

  return NewUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const update = (id, name) => {
  const prevData = getById(id);

  return Object.assign(prevData, { name });
};

const reset = () => {
  users = [];
  NextId = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
