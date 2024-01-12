'use strict';

let users = [];

const createNewId = () => {
  return users.reduce((id, user) => (user.id > id ? user.id : id), 0) + 1;
};

const getAll = () => users;

const getByID = id => users.find(u => u.id === id);

const create = name => {
  const newUser = {
    id: createNewId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = id => {
  const filteredUsers = users.filter(u => u.id !== id);

  users = filteredUsers;
};

const update = (id, name) => {
  const user = getByID(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  getByID,
  create,
  remove,
  update,
};
