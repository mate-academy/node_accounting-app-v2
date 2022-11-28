'use strict';

class Expense {
  constructor() {
    this.expenses = [];
  };

  init() {
    this.expenses = [];
  };

  getExpenses() {
    return this.expenses;
  };

  getExpense(expenseId) {
    return this.expenses.find(expense => expense.id === +expenseId);
  }

  getExpensesByDate(from, to) {
    return this.expenses.filter(expense =>
      expense.spentAt > from && expense.spentAt < to);
  };

  getExpensesByCategory(category) {
    return this.expenses.filter(expense =>
      expense.category === category);
  };

  getExpensesByUser(userId) {
    return this.expenses.filter(expense => expense.userId === +userId);
  };

  createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  ) {
    const maxId = Math.max(...this.expenses.map(expense => expense.id), 0);

    const newExpense = {
      id: maxId + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    this.expenses.push(newExpense);

    return newExpense;
  };

  deleteExpense(expenseId) {
    this.expenses = this.expenses.filter(expense => expense.id !== +expenseId);
  };

  updateExpense(expenseId, data) {
    const expense = this.getExpense(expenseId);

    Object.assign(expense, data);

    return expense;
  };
}

const expensesService = new Expense();

module.exports = { expensesService };
