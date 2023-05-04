'use strict';

const { generateId } = require('../functions/generateId');

class Expenses {
  constructor() {
    this.data = [];
  }

  init() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    return this.data.find(expense => expense.id === +id);
  }

  getByParameters(userId, categories, from, to) {
    let filteredExpenses = [...this.data];

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === +userId);
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(expense => (
        categories.includes(expense.category)
      ));
    }

    if (from || to) {
      filteredExpenses = this.getByTime(from, to, filteredExpenses);
    }

    return filteredExpenses;
  }

  getByTime(
    from = new Date(0),
    to = new Date().toString(),
    currentExpenses = this.data,
  ) {
    const timeFrom = new Date(from);
    const timeTo = new Date(to);

    return currentExpenses.filter(expense => {
      const timeCurrent = new Date(expense.spentAt);

      return timeCurrent >= timeFrom && timeCurrent <= timeTo;
    });
  }

  create(data) {
    const newExpense = {
      id: generateId(),
      ...data,
    };

    this.data.push(newExpense);

    return newExpense;
  }

  delete(id) {
    this.data = this.data.filter(expense => expense.id !== +id);
  }

  update(expense, data) {
    Object.assign(expense, {
      ...data,
    });
  }
}

module.exports = { expenses: new Expenses() };
