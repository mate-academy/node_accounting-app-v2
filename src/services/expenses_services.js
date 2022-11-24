'use strict';

class Expense {
  constructor() {
    this.expenses = [];
  };

  init() {
    this.expenses = [];
  };

  getAll() {
    return this.expenses;
  };

  getById(expenseId) {
    return this.expenses.find(expense => expense.id === +expenseId);
  }

  getByParams(searchParams) {
    const {
      userId,
      category,
      from,
      to,
    } = searchParams;

    return this.expenses.filter(expense => {
      if (userId && expense.userId !== +userId) {
        return false;
      }

      if (category && expense.category !== category) {
        return false;
      }

      if (from && Date.parse(expense.spentAt) < Date.parse(from)) {
        return false;
      }

      if (to && Date.parse(expense.spentAt) > Date.parse(to)) {
        return false;
      }

      return true;
    });
  }

  getByUserId(userId) {
    return this.expenses.filter(expense => expense.userId === +userId);
  }

  add({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }) {
    const maxId = Math.max(...this.expenses.map(expense => expense.id), 0);

    const newExpense = {
      id: maxId + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    this.expenses.push(newExpense);

    return newExpense;
  };

  remove(expenseId) {
    this.expenses = this.expenses.filter(expense => expense.id !== +expenseId);
  };

  update(expenseId, data) {
    const expense = this.getById(expenseId);

    Object.assign(expense, data);

    return expense;
  };
}

const expenseServices = new Expense();

module.exports = { expenseServices };
