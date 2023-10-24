'use strict';

const expanses = [];

module.exports = {
  getAll: ({ userId, categories, to }) => expanses
    .filter(expense => !userId || expense.userId === +userId)
    .filter(expense => !categories || categories.includes(expense.category))
    .filter(expense => !to || expense.spentAt <= to),

  createExpense: (expense) => expanses.push({
    ...expense,
    id: expanses.length === 0 ? 0 : expanses[expanses.length - 1].id + 1,
  }) && [...expanses].pop(),

  getById: (expenseId) => expanses
    .find(expense => +expense.id === +expenseId),

  remove: (expenseId) => expanses
    .splice(expanses.findIndex(expense => expense.id === +expenseId), 1),

  updateExpense: (expenseId, data) => Object
    .assign(module.exports.getById(expenseId), data),

  resetExpense: () => expanses.splice(0),
};
