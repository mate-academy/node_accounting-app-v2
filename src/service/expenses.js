'use strict';

let expenses = [];

const handleFilterExpenses = (filterBy) => {
  let updatedExpenses = expenses;

  if (filterBy.userId) {
    updatedExpenses = expenses.filter(expense => (
      expense.userId === +filterBy.userId
    ));
  } else if (filterBy.from) {
    updatedExpenses = expenses.filter(expense => (
      expense.spentAt > filterBy.from
    ));
  } else if (filterBy.to) {
    updatedExpenses = expenses.filter(expense => (
      expense.spentAt < filterBy.to
    ));
  } else if (filterBy.category) {
    updatedExpenses = expenses.filter(expense => (
      filterBy.category === expense.category
    ));
  };

  return updatedExpenses;
};

const getAll = () => {
  return expenses;
};

const getExpense = (expenseId) => {
  return expenses.find(expense => expense.id === expenseId) || null;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const updateExpense = (expenseId, changeParams) => {
  let foundExpense = expenses.find(expense => expenseId === expense.id);

  foundExpense = {
    ...foundExpense,
    ...changeParams,
  };

  return foundExpense;
};

const addExpense = (newExpenseParams) => {
  const newExpense = {
    id: Math.max(expenses.map(expense => expense.id)) + 1,
    ...newExpenseParams,
  };

  return expenses.push(newExpense);
};

module.exports = {
  handleFilterExpenses,
  getAll,
  deleteExpense,
  updateExpense,
  getExpense,
  addExpense,
};
