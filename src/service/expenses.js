'use strict';

let expenses = [];

const reset = () => {
  expenses = [];
};

const filterExpanses = (expense, queryParams) => {
  const { userId, categories, from, to } = queryParams;

  return (
    (!userId || expense.userId === Number(userId))
    && (!categories || categories.includes(expense.category))
    && (!from || expense.spentAt >= from)
    && (!to || expense.spentAt <= to)
  );
};

const getAll = (params) => {
  const filteredExpenses = expenses
    .filter(expense => filterExpanses(expense, params));

  return filteredExpenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expenseId === expense.id);

  return foundExpense || null;
};

const add = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
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

const remove = (expenseId) => {
  expenses = expenses.filter(user => user.id !== expenseId);
};

const update = (id, updatedData) => {
  const expense = getById(id);

  Object.assign(expense, updatedData);

  return expense;
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  reset,
};
