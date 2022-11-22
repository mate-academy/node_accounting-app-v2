'use strict';

const { v4: uuid } = require('uuid');

let expenses = [];

const getAll = () => expenses;

const getById = (expenseId) => {
  return expenses.find(expense => expense.id === +expenseId);
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    id: uuid(),
    userId: +userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const update = ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = getById(id);

  Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
