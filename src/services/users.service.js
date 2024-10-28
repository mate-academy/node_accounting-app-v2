const { createId } = require('../utils/id.service');

let users = [];

const resetUsers = () => {
  users = [];
};

const getUsers = () => {
  return users;
};

const getUser = (id) => {
  return users.find((elem) => elem.id === id);
};
const addUser = (elem) => {
  const elemWithId = {
    id: createId(users),
    ...elem,
  };

  users.push(elemWithId);

  return elemWithId;
};
const updateUser = (newElem) => {
  const { id } = newElem;

  users = users.map((elem) => (elem.id === +id ? newElem : elem));

  return newElem;
};
const deleteUser = (id) => {
  const index = users.findIndex((elem) => elem.id === id);

  if (index !== -1) {
    users.splice(index, 1);
  }

  return users;
};

module.exports = {
  resetUsers,
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
