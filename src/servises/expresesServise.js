'use strict';

const expenses = [];

const addExpense = (expenseBody) => {
  const expense = {
    id: +new Date(),
    ...expenseBody,
  };

  expenses.push(expense);

  return expense;
};

const getExpenseById = id => {
  return expenses.find(expense => id === expense.id) || null;
};

const deleteExpense = (id) => {
  const index = expenses.findIndex(expense => expense.id === +id);

  if (index === -1) {
    return null;
  }

  expenses.splice(index, 1);

  return expenses;
};

const updateById = (expenseData) => {
  const { id } = expenseData;
  const expense = getExpenseById(id);

  if (expense) {
    Object.assign(expense, expenseData);

    return expense;
  }
};

module.exports = {
  addExpense,
  deleteExpense,
  updateById,
  getExpenseById,
};
