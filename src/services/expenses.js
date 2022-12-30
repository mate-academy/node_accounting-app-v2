'use strict';

class Expenses {
  constructor() {
    this.expenses = [];
  }

  getExpenses() {
    return this.expenses;
  }

  getExpenseById(expenseId) {
    return this.expenses.find(expense => expense.id === +expenseId);
  }

  filterExpenses(searchParams) {
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

  createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  ) {
    const maxId = Math.max(...this.expenses.map(expense => expense.id));
    const newId = (this.expenses.length > 0) ? maxId + 1 : 1;

    const newExpense = {
      id: newId,
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

  deleteExpense(expenseId) {
    this.expenses = this.expenses.filter(expense => expense.id !== +expenseId);
  }

  updateExpense(expenseId, expenseBody) {
    const foundExpense = this.getExpenseById(expenseId);

    Object.assign(foundExpense, expenseBody);

    return foundExpense;
  }
};

exports.Expenses = Expenses;
