'use strict';

let expenses = [];

class ExpensesService {
  setInitialExpenses() {
    expenses = [];
  }
  createExpense({
    userId, spentAt, title, amount, category, note,
  }) {
    const expenseId = expenses.length
      ? Math.max(...expenses.map(expense => expense.id)) + 1
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

    expenses.push(newExpense);

    return newExpense;
  }

  getAll() {
    return expenses;
  }

  getOne(expenceId) {
    const expenseData = expenses
      .find(expense => expense.id === +expenceId) || null;

    return expenseData;
  }

  removeOne(expenseId) {
    const expencesData = expenses
      .filter(expense => expense.id !== +expenseId);
    const hasDeleted = expenses.length !== expencesData.length;

    expenses = expencesData;

    return hasDeleted;
  }

  modifyExpence(expenceId, {
    spentAt,
    title,
    amount,
    category,
    note,
  }) {
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
