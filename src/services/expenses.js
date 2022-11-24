'use strict';

class ExpensesService {
  constructor() {
    this.expenses = [];
  }

  createExpense({
    userId, spentAt, title, amount, category, note,
  }) {
    const expenseId = this.expenses.length
      ? Math.max(...this.expenses.map(expense => expense.id)) + 1
      : 1;
    const newExpense = {
      id: expenseId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  getAll() {
    return this.expenses;
  }

  getOne(expenceId) {
    const expenseData = this.expenses
      .find(expense => expense.id === +expenceId) || null;

    return expenseData;
  }

  removeOne(expenseId) {
    const expencesData = this.expenses
      .filter(expense => expense.id !== +expenseId);
    const hasDeleted = this.expenses.length !== expencesData.length;

    this.expenses = expencesData;

    return hasDeleted;
  }

  modifyExpence(
    expenceId,
    spentAt,
    title,
    amount,
    category,
    note
  ) {
    const expenseData = this.getOne(expenceId);

    if (expenseData) {
      Object.assign(expenseData, {
        spentAt: spentAt || expenseData.spentAt,
        title: title || expenseData.title,
        amount: amount || expenseData.amount,
        category: category || expenseData.category,
        note: note || expenseData.note,
      });
    }

    return expenseData;
  }
}

module.exports = { ExpensesService };
