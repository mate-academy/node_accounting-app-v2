'use strict';

let expenses = [];
let expenseId = 1;

const expensesService = {
  clear() {
    expenses = [];
    expenseId = 1;
  },

  create(expenseData) {
    const expense = {
      id: expenseId,
      ...expenseData,
    };

    expenses.push(expense);
    expenseId += 1;

    return expense;
  },

  getAll(filters = {}) {
    let result = expenses;

    if (filters.userId) {
      result = result.filter((e) => e.userId === filters.userId);
    }

    if (filters.from) {
      result = result.filter(
        (e) => new Date(e.spentAt) >= new Date(filters.from),
      );
    }

    if (filters.to) {
      result = result.filter(
        (e) => new Date(e.spentAt) <= new Date(filters.to),
      );
    }

    if (filters.categories) {
      const categoryList = Array.isArray(filters.categories)
        ? filters.categories
        : [filters.categories];

      result = result.filter((e) => categoryList.includes(e.category));
    }

    return result;
  },

  getById(id) {
    return expenses.find((e) => e.id === id);
  },

  update(id, data) {
    const expense = this.getById(id);

    if (!expense) {
      return null;
    }

    if (data.userId !== undefined) {
      expense.userId = data.userId;
    }

    if (data.spentAt !== undefined) {
      expense.spentAt = data.spentAt;
    }

    if (data.title !== undefined) {
      expense.title = data.title;
    }

    if (data.amount !== undefined) {
      expense.amount = data.amount;
    }

    if (data.category !== undefined) {
      expense.category = data.category;
    }

    if (data.note !== undefined) {
      expense.note = data.note;
    }

    return expense;
  },

  delete(id) {
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return false;
    }
    expenses.splice(index, 1);

    return true;
  },
};

module.exports = expensesService;
