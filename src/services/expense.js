'use strict';

class Expense {
  constructor() {
    this.expenses = [];
  }

  getExpenses(query) {
    if (query.userId && query.category) {
      return this.expenses.filter(expense => expense.userId === +query.userId
          && expense.category === query.category) || false;
    }

    if (query.userId) {
      return this.expenses.filter(expense => expense.userId === +query.userId)
        || false;
    }

    if (query.from && query.to) {
      return this.expenses.filter(expense => {
        if (expense.spentAt >= query.from && expense.spentAt <= query.to) {
          return expense;
        }
      });
    }

    return this.expenses;
  }

  setExpenses(data, users) {
    if (users.getUsers().find(user => user.id === data.userId)) {
      let id = 0;

      if (this.expenses.length !== 0) {
        id = this.expenses[this.expenses.length - 1].id + 1;
      }

      const newExpense = {
        id,
        ...data,
      };

      this.expenses.push(newExpense);

      return newExpense;
    }

    return false;
  }

  getExpenseById(expenseId) {
    return this.expenses.find(expense => expense.id === +expenseId);
  }

  updateExpense(expenseId, newData) {
    const foundExpense = this.expenses
      .find(expense => expense.id === +expenseId);

    if (foundExpense) {
      Object.assign(foundExpense, newData);

      return foundExpense;
    }

    return false;
  }

  deleteExpense(expenseId) {
    const prevLen = this.expenses.length;

    this.expenses = this.expenses.filter(expense => expense.id !== +expenseId);

    return prevLen !== this.expenses.length;
  }
}

module.exports.Expense = Expense;
