'use strict';

const getId = (expenses) =>
  expenses.reduce((acc, item) => {
    return acc > item.id ? acc : item.id;
  }, 0) + 1;

const isExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
) => {
  if (typeof userId !== 'string'
    && typeof spentAt !== 'string'
    && typeof title !== 'string'
    && typeof amount !== 'string'
    && typeof category !== 'string'
  ) {
    return true;
  }
};

module.exports = {
  getId,
  isExpense,
};
