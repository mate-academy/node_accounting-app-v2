'use strict';

const createFilterExpenseFactory = {
  byUserId: (userId) => {
    return (expense) => userId === expense.userId;
  },

  byCategories: (categories) => {
    return (expense) => categories.includes(expense.category);
  },

  toDate: (to) => {
    return (expense) => expense.spentAt < to;
  },

  fromDate: (from) => {
    return (expense) => expense.spentAt > from;
  },
};

module.exports = { createFilterExpenseFactory };
