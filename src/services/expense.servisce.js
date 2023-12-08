'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [
  // {
  //   id: '1',
  //   userId: '1',
  //   spentAt: '2023-12-06T23:17:37.468Z',
  //   title: 'buy',
  //   amount: '20',
  //   category: 'secret',
  //   note: 'hello',
  // },
  // {
  //   id: '2',
  //   userId: '2',
  //   spentAt: '2023-11-06T23:20:37.464Z',
  //   title: 'lost',
  //   amount: '500',
  //   category: 'ali',
  //   note: 'yep',
  // },
];

const getAll = () => expenses;

const getById = (id) => {
  return expenses.find((exp) => exp.id === id) || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const newExpens = {
    id: uuidv4(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpens);

  return newExpens;
};

const update = ({ id, userId, spentAt, title, amount, category, note }) => {
  const expens = getById(id);

  Object.assign(expens, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expens;
};

const remove = (id) => {
  expenses = expenses.filter((exp) => exp.id !== id) || null;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
