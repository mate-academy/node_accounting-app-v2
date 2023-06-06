'use strict';

class Expences {
  constructor() {
    this.expenses = [];
  }

  reset() {
    this.expenses = [];
  }

  getAll(userId, category, from, to) {
    const filterByUserId = (expense) => {
      return !userId || expense.userId === Number(userId);
    };

    const filterByCategory = (expense) => {
      return !category || category.includes(expense.category);
    };

    const filterByTime = (expense) => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;

      return (!fromDate || expenseDate >= fromDate)
        && (!toDate || expenseDate <= toDate);
    };

    this.expenses = this.expenses
      .filter(filterByUserId)
      .filter(filterByCategory)
      .filter(filterByTime);

    return this.expenses;
  }

  getById(expenceId) {
    const foundExpense = this.expenses
      .find(expense => Number(expenceId) === expense.id);

    return foundExpense || null;
  }

  createExpence(data) {
    const newUser = {
      id: this.expenses.length + 1,
      ...data,
    };

    this.expenses.push(newUser);

    return newUser;
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

const expenceServices = new Expences();

module.exports = expenceServices;
