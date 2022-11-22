'use strict';

class Expenses {
  constructor() {
    this.expenses = [];
  }

  getAll() {
    return this.expenses;
  }

  getOne(expenseId) {
    return this.expenses.find(expense => expense.id === +expenseId);
  }

  getFiltered(searchParams) {
    const { userId, category, from, to } = searchParams;

    let filteredExpenses = this.expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.userId === +userId
      );
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.category === category
      );
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter(
        expense => new Date(expense.spentAt) >= fromDate
          && new Date(expense.spentAt) <= toDate
      );
    }

    return filteredExpenses;
  }

  create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  ) {
    const newExpense = {
      id: this.expenses.length + 1,
      userId: +userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  deleteOne(expenseId) {
    this.expenses = this.expenses.filter(expense => expense.id !== +expenseId);
  }

  modifyOne(expenseId, expenseBody) {
    const expenseToModify = this.getOne(expenseId);

    Object.assign(expenseToModify, expenseBody);

    return expenseToModify;
  }
};

exports.Expenses = Expenses;
