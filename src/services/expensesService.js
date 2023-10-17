'use strict';

let expenses = [];

const getAll = () => expenses;

const addUser = name => {
  const user = {
    id: +new Date(),
    name,
  };

  expenses.push(user);

  return user;
};

const getById = id => {
  return expenses.find(user => id === user.id) || null;
};

const deleteById = id => {
  if (getById(id)) {
    expenses = expenses.filter(user => user.id !== id);

    return true;
  }

  return false;
};

const updateById = ({ id, name }) => {
  const user = getById(id);

  if (user) {
    user.name = name;

    return user;
  }
};

module.exports = {
  getAll,
  addUser,
  getById,
  deleteById,
  updateById,
};
