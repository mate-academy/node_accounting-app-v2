'use strict';

const getFilteredExpenses = (expenses, filter) => {
  let filteredExpenses = [...expenses];

  const {
    userId,
    categories,
    from,
    to,
  } = filter;

  let formattedCategories = [];

  if (Array.isArray(filter.categories)) {
    formattedCategories = [...categories];
  } else if (categories) {
    formattedCategories.push(categories);
  }

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (formattedCategories.length > 0) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    const formattedFrom = new Date(from).getTime();

    filteredExpenses = filteredExpenses
      .filter(expense => {
        const expenseTime = new Date(expense.spentAt).getTime();

        return expenseTime >= formattedFrom;
      });
  }

  if (to) {
    const formattedTo = new Date(to).getTime();

    filteredExpenses = filteredExpenses
      .filter(expense => {
        const expenseTime = new Date(expense.spentAt).getTime();

        return expenseTime <= formattedTo;
      });
  }

  return filteredExpenses;
};

module.exports = {
  getFilteredExpenses,
};
