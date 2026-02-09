'use strict';

class ExpenseService {
  constructor(expenses) {
    this.expenses = expenses;
    this.idCounter = 1;
  }

  getAllExpenses(filters = {}) {
    let result = [...this.expenses];

    if (filters.userId !== undefined) {
      result = result.filter((e) => e.userId === filters.userId);
    }

    if (filters.categories) {
      const categoryList = Array.isArray(filters.categories)
        ? filters.categories
        : [filters.categories];

      result = result.filter((e) => categoryList.includes(e.category));
    }

    if (filters.from) {
      const fromDate = new Date(filters.from);

      result = result.filter((e) => new Date(e.spentAt) >= fromDate);
    }

    if (filters.to) {
      const toDate = new Date(filters.to);

      result = result.filter((e) => new Date(e.spentAt) <= toDate);
    }

    return result;
  }

  getExpenseById(id) {
    return this.expenses.find((e) => e.id === id);
  }

  createExpense(data) {
    const { userId, spentAt, title, amount, category, note } = data;

    const expense = {
      id: this.idCounter++,
      userId,
      spentAt,
      title,
      amount,
      category,
    };

    if (note !== undefined) {
      expense.note = note;
    }

    this.expenses.push(expense);

    return expense;
  }

  updateExpense(id, data) {
    const expense = this.getExpenseById(id);

    if (!expense) {
      return null;
    }

    const { spentAt, title, amount, category, note } = data;

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    return expense;
  }

  deleteExpense(id) {
    const index = this.expenses.findIndex((e) => e.id === id);

    if (index !== -1) {
      this.expenses.splice(index, 1);

      return true;
    }

    return false;
  }
}

module.exports = ExpenseService;
