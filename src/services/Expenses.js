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

    const filteredExpenses = this.expenses.filter(
      expense => {
        if (userId && expense.userId !== +userId) {
          return false;
        }

        if (category && expense.category !== category) {
          return false;
        }

        const fromDate = new Date(from);
        const toDate = new Date(to);

        if ((from && to)
          && (new Date(expense.spentAt) < fromDate
          || new Date(expense.spentAt) > toDate)
        ) {
          return false;
        }

        return true;
      }
    );

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
    const maxId = Math.max(...this.expenses.map(expense => expense.id));
    const id = (this.expenses.length > 0) ? maxId + 1 : 1;

    const newExpense = {
      id,
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
