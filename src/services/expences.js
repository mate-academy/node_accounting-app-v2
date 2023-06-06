'use strict';

class Expences {
  constructor() {
    this.expences = [];
  }

  reset() {
    this.expences = [];
  }

  getAll(userId, categories, from, to) {
    if (userId) {
      this.expences = this.expenses
        .filter(expence => expence.userId === Number(userId));
    }

    if (categories) {
      this.expences = this.expenses
        .filter(expence => expence.category === categories);
    }

    if (from && to) {
      this.expences = this.expenses.filter(expence => {
        const expanseDate = new Date(expence.spentAt);
        const fromDate = new Date(from);
        const toDate = new Date(to);

        return fromDate <= expanseDate && toDate > expanseDate;
      });
    }
    this.expences = this.expences;

    return this.expences;
  }

  getById(expenceId) {
    const foundExpense = this.expences
      .find(expense => Number(expenceId) === expense.id);

    return foundExpense || null;
  }

  createExpence(data) {
    const newUser = {
      id: this.expences.length + 1,
      ...data,
    };

    this.expences.push(newUser);

    return newUser;
  }

  removeExpence(expensesId) {
    this.expences = this.expences
      .filter(expense => Number(expensesId) !== expense.id);
  }

  updateById(expensesId, body) {
    const foundExpence = this.getById(expensesId);

    Object.assign(foundExpence, body);

    return foundExpence;
  }
}

const expenceServices = new Expences();

module.exports = expenceServices;
