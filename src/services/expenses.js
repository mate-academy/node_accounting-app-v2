'use strict';

class ExpensesService {
  constructor() {
    this.expenses = [];
  }
  setInitialExpenses() {
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

  getAll(data) {
    const {
      userId, category, to, from,
    } = data;

    const expenses = this.expenses.filter(expense => {
      if (userId && expense.userId !== +userId) {
        return false;
      }

      if (category && expense.category !== category) {
        return false;
      }

      if (from && expense.spentAt < from) {
        return false;
      }

      if (to && expense.spentAt > to) {
        return false;
      }

      return true;
    });

    return expenses;
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

  modifyExpence(expenceId, data) {
    const expenseData = this.getOne(expenceId);

    if (expenseData) {
      Object.assign(expenseData, data);
    }

    return expenseData;
  }
}

const expensesService = new ExpensesService();

module.exports = { expensesService };
