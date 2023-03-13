'use strict';

const getFilteredExpenses = (expenses, filterParams) => {
  const { userId, category, from, to } = filterParams;
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = expenses.filter(expense => (
      expense.category === category
    ));
  }

  if (from) {
    filteredExpenses = expenses.filter(expense => (
      expense.spentAt >= from
    ));
  }

  if (to) {
    filteredExpenses = expenses.filter(expense => (
      expense.spentAt <= to
    ));
  }

  return filteredExpenses;
};

module.exports = { getFilteredExpenses };
