'use strict';

class ExpensesModel {
  constructor(createId, filterExpanses) {
    this.createId = createId;
    this.filterExpanses = filterExpanses;
    this.expenses = [];
  }

  getExpenses(queryParams) {
    const filteredExpenses = this.expenses.filter(expense => (
      this.filterExpanses(expense, queryParams)
    ));

    return filteredExpenses;
  }

  getExpenseById(expensesId) {
    const foundExpense = this.expenses.find(({ id }) => (
      id === Number(expensesId)
    ));

    return foundExpense || null;
  }

  createExpense(data) {
    const newExpense = {
      id: this.createId(this.expenses),
      ...data,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  removeExpense(expensesId) {
    this.expenses = this.expenses.filter(({ id }) => id !== Number(expensesId));
  }

  updateExpense({ expensesId, data }) {
    const expense = this.getExpenseById(expensesId);

    Object.assign(expense, data);

    return expense;
  }

  resetExpenses() {
    this.expenses = [];
  };
}

module.exports = {
  ExpensesModel,
};
