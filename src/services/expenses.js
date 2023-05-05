'use strict';

class ExpensesService {
  constructor() {
    this.expenses = [];
    this.lastExpenseId = 0;
  }

  resetData() {
    this.expenses = [];
    this.lastExpenseId = 0;
  }

  getAll({
    userId,
    categories,
    from,
    to,
  }) {
    let filteredExpenses = this.expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(expense => (
        expense.userId === +userId));
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(({ category }) => (
        categories.includes(category)));
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(({ spentAt }) => (
        spentAt >= from));
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(({ spentAt }) => (
        spentAt <= to));
    }

    return filteredExpenses;
  }

  getExpenseById(expenseId) {
    return this.expenses.find(({ id }) => id === expenseId) || null;
  }

  addExpense(expence) {
    this.lastExpenseId++;

    const newExpense = {
      ...expence,
      id: this.lastExpenseId,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  removeExpense(expenseId) {
    this.expenses = this.expenses.filter(({ id }) => id !== +expenseId);
  }

  updateExpense(expenseId, newData) {
    const expenseToUpdate = this.getExpenseById(expenseId);

    Object.assign(expenseToUpdate, newData);

    return expenseToUpdate;
  }
}

module.exports = {
  expensesService: new ExpensesService(),
};
