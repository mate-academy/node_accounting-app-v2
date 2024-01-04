'use strict';

const getFilteredExpenses = (expenses, filter) => {
  const {
    userId,
    categories,
    from,
    to,
  } = filter;

  let categoriesArr = [];

  if (Array.isArray(filter.categories)) {
    categoriesArr = [...categories];
  } else if (categories) {
    categoriesArr.push(categories);
  }

  let formattedFrom = 0;
  let formattedTo = 0;

  if (from) {
    formattedFrom = +new Date(from);
  }

  if (to) {
    formattedTo = +new Date(to);
  }

  return expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categoriesArr.length > 0 && !categoriesArr.includes(expense.category)) {
      return false;
    }

    const expenseTime = +new Date(expense.spentAt);

    if (from && expenseTime < formattedFrom) {
      return false;
    }

    if (to && expenseTime > formattedTo) {
      return false;
    }

    return true;
  });
};

module.exports = {
  getFilteredExpenses,
};
