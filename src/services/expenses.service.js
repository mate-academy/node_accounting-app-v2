'use strict';

let expenses = [];

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getAll = () => {
  return expenses;
};

const getOne = (expenseId) => {
  return expenses.find(expense => expense.id === +expenseId) || null;
};

const update = (expenseId, body) => {
  const findExpense = getOne(expenseId);

  Object.assign(findExpense, body);

  return findExpense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(item => item.id !== +expenseId);
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  clearExpenses,
};
