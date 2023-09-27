'use strict';

const { generateId } = require('../helpers/generateId');

let expenses = [];
const REQUIRE_KEYS = {
  userId: 0,
  spentAt: 'string',
  title: 'string',
  amount: 0,
  category: 'string',
  note: 'string',
};

const hasRequiredProps = (expense, res) => {
  for (const prop in expense) {
    if (!expense.hasOwnProperty(prop)) {
      res.send('Your data is empty. Please, specify all required fields');

      return false;
    }
  }

  if (
    typeof expense === 'object'
    && !Array.isArray(expense)
    && expense !== null
  ) {
    for (const key in REQUIRE_KEYS) {
      if (REQUIRE_KEYS.hasOwnProperty(key)) {
        if (!(key in expense)) {
          res.send(`You have missed this field: ${key}`);

          return false;
        }

        if (typeof expense[key] !== typeof REQUIRE_KEYS[key]) {
          res.send(`
            The type of ${key} isn't equal to ${typeof REQUIRE_KEYS[key]}
          `);

          return false;
        }
      }
    }

    return true;
  } else {
    return false;
  }
};

const createExpense = (expense) => {
  expenses.push({
    ...expense,
    id: generateId(),
  });

  return expense;
};

const getExpenses = () => {
  return expenses;
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === id);
};

const removeExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const updateExpense = (expense, expenseData) => {
  for (const prop in expenseData) {
    if (!REQUIRE_KEYS.hasOwnProperty(prop)) {
      return false;
    }
  }

  Object.assign(expense, { ...expenseData });

  return expense;
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  removeExpense,
  updateExpense,
  hasRequiredProps,
};
