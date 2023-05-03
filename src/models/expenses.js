'use strict';

class ExpensesModel {
  constructor() {
    this.expenses = [];
  }

  reset() {
    this.expenses = [];
  }

  getAll(requestBody) {
    const {
      userId,
      categories,
      from,
      to,
    } = requestBody;

    let filteredExpenses = this.expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.id === +userId,
      );
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
  }

  getById(expenseId) {
    const foundExpense = this.expenses.find(
      expense => expense.id === expenseId,
    ) || null;

    return foundExpense;
  }

  create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  ) {
    const maxId = this.expenses.length
      ? Math.max(...this.expenses.map(({ id }) => id))
      : -1;
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
  }

  remove(expenseId) {
    if (!this.getById(expenseId)) {
      return false;
    }

    this.expenses = this.expenses.filter(expense => expense.id !== expenseId);

    return true;
  }

  update(expenseId, requestBody) {
    const {
      title,
      spentAt,
      amount,
      category,
      note,
    } = requestBody;

    const foundExpense = this.getById(expenseId);

    if (!foundExpense) {
      return null;
    }

    Object.assign(foundExpense, {
      title: title || foundExpense.title,
      spentAt: spentAt || foundExpense.spentAt,
      amount: amount || foundExpense.amount,
      category: category || foundExpense.category,
      note: note || foundExpense.note,
    });

    return foundExpense;
  }
}

module.exports = {
  ExpensesModel: new ExpensesModel(),
};
