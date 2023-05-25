'use strict';

const { v4: uuid } = require('uuid');
const { filterExpenses } = require('../helpers');

class Expenses {
  constructor() {
    this.expenses = [];
  }

  reset() {
    this.expenses = [];
  }

  getAll({ userId, categories, from, to }) {
    return filterExpenses(
      this.expenses,
      {
        userId,
        categories,
        from,
        to,
      }
    );
  }

  getById(id) {
    return this.expenses.find(expense => expense.id === id);
  }

  create(expense) {
    const newExpense = {
      id: uuid(),
      ...expense,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  removeById(id) {
    const expense = this.getById(id);

    if (!expense) {
      throw new Error(`Expense with id ${id} not found`);
    }

    this.expenses = this.expenses.filter(exp => exp.id !== id);

    return expense;
  }

  update(expense, partsToUpdate) {
    Object.assign(expense, partsToUpdate);
  }
}

const expensesService = new Expenses();

module.exports = { expensesService };
