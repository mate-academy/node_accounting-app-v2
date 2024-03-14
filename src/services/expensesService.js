'use strict';

let expenses = [];

const init = () => {
  expenses.length = 0;
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === +userId
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(
      expense => new Date(expense.spentAt) >= new Date(from)
        && new Date(expense.spentAt) <= new Date(to)
    );
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find(el => el.id === +id);
};

const createExpenses = (newExpenses) => {
  const expense = {
    id: Date.now(), ...newExpenses,
  };

  expenses.push(expense);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const updateExpense = (id, newExpense) => {
  let expense = getExpenseById(id);

  expense = {
    ...expense, ...newExpense,
  };

  return expense;
};

module.exports = {
  init,
  getExpenses,
  getExpenseById,
  createExpenses,
  deleteExpense,
  updateExpense,
};
