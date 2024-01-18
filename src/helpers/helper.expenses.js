'use strict';

const prepareExpenses = (expenses, queryParams) => {
  let copyExpenses = [...expenses];

  for (const key in queryParams) {
    switch (key) {
      case 'userId':
      case 'amount':
        copyExpenses = copyExpenses
          .filter(expense => expense[key] === +queryParams[key]);
        break;

      case 'from':
        copyExpenses = copyExpenses
          .filter(expense =>
            new Date(expense.spentAt) > new Date(queryParams[key]));
        break;

      case 'to':
        copyExpenses = copyExpenses
          .filter(expense =>
            new Date(expense.spentAt) <= new Date(queryParams[key]));
        break;

      default:
        copyExpenses = copyExpenses
          .filter(expense => expense[key] === queryParams[key]);
        break;
    }
  }

  return copyExpenses;
};

module.exports = {
  prepareExpenses,
};
