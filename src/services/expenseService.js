'use strict';

class Expenses {
  constructor() {
    this.expenses = [];
  }

  clearAll() {
    this.expenses = [];
  }

  getAll() {
    return this.expenses;
  }

  getById(id) {
    const foundExpense = this.expenses.find((expense) => expense.id === +id);

    return foundExpense || null;
  }

  create(expenseData) {
    const newId = this.expenses.length
      ? Math.max(...this.expenses.map((expense) => expense.id))
      : 0;

    const newExpense = {
      ...expenseData,
      id: newId + 1,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  remove(id) {
    this.expenses = this.expenses.filter((expense) => expense.id !== +id);
  }

  update(expense, updatedData) {
    Object.assign(expense, updatedData);
  }
}

module.exports = { expenseService: new Expenses() };
