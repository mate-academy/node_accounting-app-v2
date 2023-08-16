'use strict';

class Expenses {
  constructor() {
    this.expenses = [];
  }

  reset() {
    this.expenses = [];
  }

  getExpenses(
    categories,
    userId,
    from,
    to,
  ) {
    let filteredExpenses = [...this.expenses];

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === +userId);
    }

    if (categories) {
      filteredExpenses = filteredExpenses
        .filter(expense => categories.includes(expense.category));
    }

    if (from) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.spentAt >= from);
    }

    if (to) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.spentAt <= to);
    }

    return filteredExpenses;
  }

  getExpense(id) {
    const expense = this.expenses
      .find(currentExpense => currentExpense.id === +id);

    if (!expense) {
      return null;
    }

    return expense;
  }

  addExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }) {
    const newExpense = {
      id: this.expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    if (!newExpense) {
      return null;
    }

    this.expenses.push(newExpense);

    return newExpense;
  }

  removeExpense(id) {
    const expense = this.getExpense(id);

    if (!expense) {
      return null;
    }

    this.expenses = this.expenses
      .filter(currentExpense => currentExpense.id !== +id);

    return expense;
  }

  updateExpense({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }) {
    const expense = this.getExpense(id);

    if (!expense) {
      return null;
    }

    Object.assign(expense, {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return expense;
  }
}

module.exports = {
  ExpenseModel: new Expenses(),
};
