'use strict';

function getFilteredExpenses(params, expenses) {
  const { userId, categories, from, to } = params;
  let filteredExpenses = [...expenses];

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

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.spentAt > from
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.spentAt < to
    );
  }

  return filteredExpenses;
}

module.exports = getFilteredExpenses;
