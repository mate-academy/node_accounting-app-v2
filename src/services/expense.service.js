'use strict';

const { getFilteredExpenses } = require('../helpers/getFilteredExpenses.js');
const { getNewId } = require('../helpers/getNewId.js');

let expenses = [];

const getAllFiltered = (filters) => {
  return getFilteredExpenses(expenses, filters);
};

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const ids = expenses.map(currentExpense => currentExpense.id);

  const expense = {
    id: getNewId(ids),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const getById = (id) => {
  return expenses.find(user => user.id === id) || null;
};

const remove = (id) => {
  expenses = expenses.filter(user => user.id !== id);
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
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  });

  return expense;
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  expenseService: {
    getAllFiltered,
    create,
    getById,
    remove,
    update,
    clearExpenses,
  },
};
