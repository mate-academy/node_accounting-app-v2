'use strict';

class Expenses {
  constructor() {
    this.expenses = [];
  }

  reset() {
    this.expenses = [];
  }

  getExpenses(userId, categories, from, to) {
    let filteredExpenses = [...this.expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        return categories.includes(expense.category);
      });
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.spentAt >= from,
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.spentAt <= to,
      );
    }

    return filteredExpenses;
  }

  getExpense(id) {
    const expense = this.expenses.find(
      (currentExpense) => +currentExpense.id === +id,
    );

    if (!expense) {
      return null;
    }

    return expense;
  }

  addExpense({ userId, spentAt, title, amount, category, note }) {
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

    this.expenses = this.expenses.filter(
      (currentExpense) => currentExpense.id !== +id,
    );

    return expense;
  }

  updateExpense(id, paramsToChange) {
    const expense = this.getExpense(id);

    if (!expense) {
      return null;
    }

    if (Object.keys(paramsToChange).length === 0) {
      return expense;
    }

    Object.assign(expense, paramsToChange);

    return Object.assign(expense, paramsToChange);
  }
}

module.exports = {
  ExpenseModel: new Expenses(),
};
