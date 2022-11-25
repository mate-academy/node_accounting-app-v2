'use strict';

class ExpenseService {
  constructor() {
    this.expenses = [];
  }

  getAll() {
    return this.expenses;
  }

  getById(expenseId) {
    const expense = this.expenses
      .find(oneExpense => oneExpense.id === expenseId);

    return expense || null;
  }

  getFiltered(searchParams) {
    const { userId, category, from, to } = searchParams;

    const filteredExpenses = this.expenses.filter(expense => {
      if (userId && expense.userId !== +userId) {
        return false;
      }

      if (category && expense.category !== category) {
        return false;
      }

      const checkDate = expense.spentAt < from || expense.spentAt > to;

      if (from && to && checkDate) {
        return false;
      }

      return true;
    });

    return filteredExpenses;
  }

  create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  ) {
    const newExpenseId = this.expenses.length
      ? Math.max(...this.expenses.map(expense => +expense.id)) + 1
      : 1;

    const newExpense = {
      id: newExpenseId,
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

  remove(expenseId) {
    const filteredExpenses = this.expenses
      .filter(expense => expense.id !== +expenseId);

    const isDeletedExpence = this.expenses.length !== filteredExpenses.length;

    this.expenses = filteredExpenses;

    return isDeletedExpence;
  }

  update({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  }) {
    const expenseForUpdate = this.getById(+id);

    Object.assign(expenseForUpdate, {
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return expenseForUpdate;
  }
}

module.exports = { ExpenseService };
