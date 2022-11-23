'use strict';

class ExpenseService {
  constructor() {
    this.expenses = [];
  }

  getAll() {
    return this.expenses;
  }

  getById(expenseId) {
    const foundExpense = this.expenses
      .find(expense => expense.id === expenseId);

    return foundExpense || null;
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

      const spentAtDate = new Date(expense.spentAt);

      const checkDate
        = spentAtDate < new Date(from) || spentAtDate > new Date(to);

      if ((from && to) && checkDate) {
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
      ? Math.max(...this.expenses.map(expense => +expense.id))
      : 0;

    const newExpense = {
      id: newExpenseId + 1,
      userId: +userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    this.expenses.push(newExpense);

    return newExpense;
  }

  remove(expenseId) {
    this.expenses = this.expenses.filter(expense => expense.id !== +expenseId);
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
