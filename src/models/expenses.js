'use strict';

const filterExpenses = require('../utils/filterExpenses');

class Expenses {
  constructor() {
    this.expenses = [];
  }

  reset() {
    this.expenses = [];
  }

  getAllExpenses({ userId, categories, from, to }) {
    const expenses = filterExpenses(this.expenses, {
      userId,
      categories,
      from,
      to,
    });

    return expenses;
  }

  getExpenseById(expenseId) {
    return this.expenses.find((expense) => expense.id === expenseId);
  }

  createExpense({ userId, spentAt, title, amount, category, note }) {
    const newExpense = {
      id: this.expenses.length + 1,
      userId: userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  changeExpenseById(expenseId, fieldToChange) {
    const expenseIndex = this.expenses.findIndex((exp) => exp.id === expenseId);

    this.expenses[expenseIndex] = {
      ...this.expenses[expenseIndex],
      ...fieldToChange,
    };

    return this.expenses[expenseIndex];
  }

  deleteExpenseById(expenseId) {
    this.expenses = this.expenses.filter(
      (currExpense) => currExpense.id !== expenseId
    );
  }
}

const expensesModel = new Expenses();

module.exports = expensesModel;
