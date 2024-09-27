'use strict';

const expenses = [];

module.exports = {
  getAll: ({ userId, categories, to }) => expenses
    .filter(expense => !userId || expense.userId === +userId)
    .filter(expense => !categories || categories.includes(expense.category))
    .filter(expense => !to || expense.spentAt <= to),

  createExpense: (expense) => {
    const newExpense = {
      ...expense,
      id: expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1,
    };

    expenses.push(newExpense);

    return newExpense;
  },

  getById: (expenseId) => expenses
    .find(expense => +expense.id === +expenseId),

  remove: (expenseId) => expenses
    .splice(expenses.findIndex(expense => expense.id === +expenseId), 1),

  updateExpense: (expenseId, data) => Object
    .assign(module.exports.getById(expenseId), data),

  resetExpense: () => expenses.splice(0),
};
