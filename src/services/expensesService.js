'use strict';

const { getMaxIdInArray } = require('../../helpers.js');

class ExpensesService {
  constructor() {
    this.expenses = [];
  }

  getExpenses() {
    return this.expenses;
  }

  getExpenseById(expenseId) {
    return this.expenses
      .find(({ id }) => id === +expenseId);
  }

  addExpense(content) {
    const newExpense = {
      id: getMaxIdInArray(this.expenses),
      ...content,
    };

    this.expenses = [...this.expenses, newExpense];

    return newExpense;
  }

  filterExpensesByQuery(query) {
    return this.expenses
      .filter(expense => {
        const { userId, from, to, categories } = query;

        const isUserIdValid = userId ? expense.userId === +userId : true;
        const isFromValid = from ? expense.spentAt >= from : true;
        const isToValid = to ? expense.spentAt <= to : true;
        const isCategoriesValid
          = categories ? categories === expense.category : true;

        return isUserIdValid && isFromValid && isToValid && isCategoriesValid;
      });
  }

  deleteExpense(expenseId) {
    this.expenses = this.expenses.filter(({ id }) => id !== +expenseId);
  }

  updateExpense(expenseId, content) {
    let expenseIndex;

    this.expenses = this.expenses.map((expense, i) => {
      if (expense.id === +expenseId) {
        expenseIndex = i;

        return {
          ...expense,
          ...content,
        };
      }

      return expense;
    });

    return this.expenses[expenseIndex];
  }

  resetExpenses() {
    this.expenses = [];
  }
}

module.exports = {
  expenseService: new ExpensesService(),
};
