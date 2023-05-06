'use strict';

const expensesService = {
  expenses: [],

  reset() {
    this.expenses = [];
  },

  getAll({
    userId,
    categories,
    from,
    to,
  }) {
    let filteredExpenses = this.expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(expense => (
        expense.userId === +userId));
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(
        expense => categories.includes(expense.category),
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.spentAt >= from,
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.spentAt <= to,
      );
    }

    return filteredExpenses;
  },

  getExpenseById(expenseId) {
    return this.expenses.find(({ id }) => id === expenseId) || null;
  },

  create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }) {
    const ids = this.expenses.map(expense => expense.id);

    const maxId = this.expenses.length
      ? Math.max(...ids)
      : 0;

    const tempExpense = {
      id: maxId + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
    };

    const newExpense = note
      ? {
        ...tempExpense,
        note,
      }
      : tempExpense;

    this.expenses.push(newExpense);

    return newExpense;
  },

  remove(expenseId) {
    if (!this.getExpenseById(expenseId)) {
      return false;
    }

    this.expenses = this.expenses.filter(expense => expense.id !== expenseId);

    return true;
  },

  update(expenseId, data) {
    const foundExpense = this.getExpenseById(expenseId);

    Object.assign(foundExpense, { ...data });
  },
};

module.exports = {
  expensesService,
};
