const { getNumberId } = require('./../utils');

class Expenses {
  constructor(initialExpenses) {
    this._expenses = initialExpenses || [];
  }

  getAll({ userId, categories, from, to }) {
    let res = this._expenses;

    if (userId) {
      res = res.filter((expense) => expense.userId === userId);
    }

    if (categories) {
      res = res.filter((expense) => {
        return categories.includes(expense.category);
      });
    }

    if (from) {
      const fromDate = new Date(from);

      res = res.filter((expense) => {
        return new Date(expense.spentAt) > fromDate;
      });
    }

    if (to) {
      const toDate = new Date(to);

      res = res.filter((expense) => new Date(expense.spentAt) < toDate);
    }

    return res;
  }

  getById(id) {
    return this._expenses.find((expense) => expense.id === id) || null;
  }

  create(expense) {
    const newExpense = { ...expense, id: getNumberId() };

    this._expenses.push(newExpense);

    return newExpense;
  }

  deleteOne(id) {
    this._expenses = this._expenses.filter((expense) => expense.id !== id);
  }

  update(id, data) {
    const expenseToUpdate = this.getById(id);

    Object.assign(expenseToUpdate, { ...data });

    return expenseToUpdate;
  }

  reset() {
    this._expenses.length = 0;
  }
}

module.exports = new Expenses();
