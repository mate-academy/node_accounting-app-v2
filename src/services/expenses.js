'use strict';

class Expenses {
  constructor() {
    this.data = [];
    this.idCounter = 0;
  }

  init() {
    this.data = [];
    this.idCounter = 0;
  }

  getAll(filterOptions) {
    const {
      userId,
      categories,
      from,
      to,
    } = filterOptions;

    let filteredExpenses = this.data;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(expense => (
        expense.userId === +userId
      ));
    }

    if (categories.length) {
      filteredExpenses = filteredExpenses.filter(expense => (
        categories.includes(expense.category)
      ));
    }

    if (from) {
      const fromDate = Date.parse(from);

      filteredExpenses = filteredExpenses.filter(expense => {
        const spentAtDate = Date.parse(expense.spentAt);

        return spentAtDate >= fromDate;
      });
    }

    if (to) {
      const toDate = Date.parse(to);

      filteredExpenses = filteredExpenses.filter(expense => {
        const spentAtDate = Date.parse(expense.spentAt);

        return spentAtDate <= toDate;
      });
    }

    return filteredExpenses;
  }

  getById(expenseId) {
    const foundExpense = this.data.find(({ id }) => id === +expenseId);

    return foundExpense || null;
  }

  create(newExpenseData) {
    this.idCounter++;

    const newExpense = {
      ...newExpenseData,
      id: this.idCounter,
    };

    this.data.push(newExpense);

    return newExpense;
  }

  removeById(expenseId) {
    this.data = this.data.filter(({ id }) => id !== +expenseId);
  }

  update(expense, partsToUpdate) {
    Object.assign(expense, partsToUpdate);
  }
}

module.exports.service = new Expenses();
