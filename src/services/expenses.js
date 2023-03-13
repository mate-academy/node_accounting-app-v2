'use strict';

let expenses = [];

const clearExpences = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const filterAllByUserId = (userId) => {
  return expenses.filter(expense => expense.userId === +userId);
};

const filterAllByDate = (from, to) => {
  return expenses.filter(expense => expense.spentAt >= from
    && expense.spentAt <= to);
};

const filterAllByCategory = (category) => {
  return expenses.filter(expense => expense.category === category);
};

const getByExpenseId = (expenseId) => {
  const currentExpense = expenses.find(expence => expence.id === expenseId);

  return currentExpense || null;
};

const create = (body) => {
  const newId = Math.max(...expenses.map(({ id }) => id), 0) + 1;

  const newExpense = {
    id: newId,
    body,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  expenses.filter(expense => expense.id !== +expenseId);
};

const update = (expenseId, body) => {
  const expenseToUpdate = getByExpenseId(expenseId);

  Object.assign(expenseToUpdate, { body });

  return expenseToUpdate;
};

module.exports = {
  clearExpences,
  getAll,
  filterAllByUserId,
  filterAllByDate,
  filterAllByCategory,
  getByExpenseId,
  create,
  remove,
  update,
};
