'use strict';

let expenses = [];

const initiate = () => {
  expenses = [];
};

const getAll = ({
  userId,
  categories,
  from,
  to,
}) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(e => e.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(e => categories.includes(e.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(e => e.spentAt > from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(e => e.spentAt < to);
  }

  return filteredExpenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(e => e.id === +expenseId);

  return foundExpense || null;
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const maxId = Math.max(...expenses.map(expense => expense.id), 0);

  const newExpense = {
    id: maxId + 1,
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

const update = ({ expenseId, data }) => {
  const expense = getById(expenseId);

  Object.assign(expense, data);

  return expense;
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

module.exports = {
  initiate,
  getAll,
  getById,
  create,
  update,
  remove,
};
