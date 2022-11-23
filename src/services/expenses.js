'use strict';

class Expenses {
  constructor() {
    this.expenses = [];
  }

  create(data) {
    const maxId = Math.max(...this.expenses.map(user => user.id));
    const id = (this.expenses.length > 0) ? maxId + 1 : 1;

    const newExpense = {
      id,
      ...data,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  getAll(userId, category, from, to) {
    const filteredExpenses = this.expenses.filter(expense => {
      const { spentAt } = expense;

      if (userId && expense.userId !== +userId) {
        return false;
      }

      if ((from && to) && (spentAt.localeCompare(from) === -1
      || spentAt.localeCompare(to) === 1)) {
        return false;
      }

      if (category && expense.category !== category) {
        return false;
      }

      return true;
    });

    return filteredExpenses;
  }

  getById(expenseId) {
    const foundExpense = this.expenses
      .find(expense => expense.id === +expenseId);

    return foundExpense;
  }

  update(expenseId, title) {
    const foundExpense = this.getById(expenseId);

    Object.assign(foundExpense, { title });
  }

  remove(expenseId) {
    this.expenses = this.expenses.filter(expense => expense.id !== +expenseId);
  }
}

module.exports = { Expenses };
