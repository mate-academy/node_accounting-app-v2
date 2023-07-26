'use strict';

const createFilterExpenseFactory = {
  byUserId: (userId) => {
    return (expense) => userId === expense.userId;
  },

  byCategories: (categories) => {
    const preparedQueryCategories = categories
      .map(category => category.toLowerCase());

    return (expense) => {
      const preparedCategory = expense.category.toLowerCase();

      return preparedQueryCategories
        .includes(preparedCategory);
    };
  },

  toDate: (to) => {
    return (expense) => expense.spentAt < to;
  },

  fromDate: (from) => {
    return (expense) => expense.spentAt > from;
  },
};

module.exports = { createFilterExpenseFactory };
