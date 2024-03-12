'use strict';

const mockExpense = {
  userId: '',
  spentAt: '',
  title: '',
  amount: '',
  category: '',
  note: '',
};

const isNewExpenseValid = (
  { userId, spentAt, title, amount, category, note }
) => {
  return typeof category === 'string'
    && typeof note === 'string'
    && typeof title === 'string'
    && typeof spentAt === 'string'
    && !isNaN(+amount)
    && !isNaN(+userId);
};

const isUpdateExpenseValid = (
  fieldsToUpdate
) => {
  const expenseKeys = Object.keys(mockExpense);

  for (const key in fieldsToUpdate) {
    if (!expenseKeys.includes(key)) {
      return false;
    }
  }

  return true;
};

const filterExpenses = (expenses, { userId, categories, from, to }) => {
  return expenses.filter(expense => {
    if (+userId && expense.userId !== +userId) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    if (from && Date.parse(expense.spentAt) < Date.parse(from)) {
      return false;
    }

    if (to && Date.parse(expense.spentAt) > Date.parse(to)) {
      return false;
    }

    return true;
  });
};

module.exports = {
  isNewExpenseValid,
  isUpdateExpenseValid,
  filterExpenses,
};
