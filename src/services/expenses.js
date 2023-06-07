'use strict';

const expensesFiltration = require('../utils/expensesFiltration');
const getUniqId = require('../utils/getId');

class Expenses {
  constructor() {
    this.expensesFiltration = expensesFiltration;
    this.getUniqId = getUniqId;
    this.expenses = [];
  }

  reset() {
    this.expenses = [];
  }

  getAll(userId, category, from, to) {
    this.expenses = this.expensesFiltration(
      this.expenses,
      userId,
      category,
      from,
      to
    );

    return this.expenses;
  }

  getById(expenseId) {
    const foundExpense = this.expenses
      .find(expense => Number(expenseId) === expense.id);

    return foundExpense || null;
  }

  createExpence(data) {
    const newExpense = {
      id: this.getUniqId(this.expenses),
      ...data,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  removeExpence(expenseId) {
    this.expenses = this.expenses
      .filter(currExpense => currExpense.id !== Number(expenseId));
  }

  updateById(expensesId, body) {
    const foundExpence = this.getById(expensesId);

    Object.assign(foundExpence, body);

    return foundExpence;
  }
}

const expenceServises = new Expenses();

module.exports = expenceServises;
