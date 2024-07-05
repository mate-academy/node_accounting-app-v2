/* eslint-disable no-shadow */
'use strict';

const expenses = [];
let currentId = 1;

const expenseModel = {
  createExpense(amount, description, userId) {
    const newExpense = {
      id: currentId++,
      amount,
      description,
      userId,
    };

    expenses.push(newExpense);

    return newExpense;
  },

  getAllExpenses() {
    return expenses;
  },

  getExpenseById(id) {
    return expenses.find((expense) => expense.id === id);
  },

  updateExpense(id, amount, description, userId) {
    const expense = expenses.find((expense) => expense.id === id);

    if (expense) {
      expense.amount = amount;
      expense.description = description;
      expense.userId = userId;

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
};

module.exports = { expenseModel };
