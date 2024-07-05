/* eslint-disable no-console */
/* eslint-disable function-paren-newline */
/* eslint-disable no-shadow */
'use strict';

const expenses = [];

const expenseModel = {
  createExpense(userId, spentAt, title, amount, category, note) {
    const newExpense = {
      userId,
      id: expenses.length + 1,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    return newExpense;
  },

  getAllExpenses(filters = {}) {
    const filteringTests = {
      userId: (id, expense) => Number(id) === expense.userId,
      id: (id, expense) => Number(id) === expense.id,
      from: (to, expense) => new Date(expense.spentAt) > new Date(to),
      to: (to, expense) => new Date(expense.spentAt) < new Date(to),
      categories: (category, expense) => category === expense.category,
    };

    return expenses.filter((expense) =>
      Object.entries(filters).reduce((result, [currKey, currVal]) => {
        const test = filteringTests[currKey];

        return result && test
          ? test(currVal, expense)
          : currVal === expense[currKey];
      }, true),
    );
  },

  getExpenseById(id) {
    return expenses.find((expense) => expense.id === id);
  },

  updateExpense(newExpense = {}) {
    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === Number(newExpense.id),
    );

    if (expenseIndex >= 0) {
      let expense = expenses[expenseIndex];

      console.log(expense);
      expense = { ...expense, ...newExpense };
      console.log(expense);

      return expense;
    }

    return null;
  },

  deleteExpense(id) {
    const index = expenses.findIndex((expense) => expense.id === id);

    if (index !== -1) {
      expenses.splice(index, 1);

      return true;
    }

    return false;
  },

  resetExpenses() {
    expenses.length = 0;
  },
};

module.exports = expenseModel;
