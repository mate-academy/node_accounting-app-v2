'use strict';

const EXPANSES = [];

module.exports = {
  getAll: ({ userId, categories, to }) => EXPANSES
    .filter(expense => !userId || expense.userId === +userId)
    .filter(expense => !categories || categories.includes(expense.category))
    .filter(expense => !to || expense.spentAt <= to),

  createExpense: (expense) => EXPANSES.push({
    ...expense,
    id: EXPANSES.length === 0 ? 0 : EXPANSES[EXPANSES.length - 1].id + 1,
  }) && [...EXPANSES].pop(),

  getById: (expenseId) => EXPANSES
    .find(expense => +expense.id === +expenseId),

  remove: (expenseId) => EXPANSES
    .splice(EXPANSES.findIndex(expense => expense.id === +expenseId), 1),

  updateExpense: (expenseId, data) => Object
    .assign(module.exports.getById(expenseId), data),

  resetExpense: () => EXPANSES.splice(0),
};
