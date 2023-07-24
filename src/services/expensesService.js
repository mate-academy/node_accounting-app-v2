'use strict';

const {
  createFilterExpenseFactory,
} = require('../helpers/createFilterExpenseFactory');
const { filterItems } = require('../utils/filterItems');

let expenses = [];

const expensesService = {
  getAll: async(userId, categories, from, to) => {
    const filters = [];

    if (userId) {
      filters.push(createFilterExpenseFactory.byUserId(userId));
    }

    if (categories && categories.length) {
      filters.push(createFilterExpenseFactory.byCategories(categories));
    }

    if (to) {
      filters.push(createFilterExpenseFactory.toDate(to));
    }

    if (from) {
      filters.push(createFilterExpenseFactory.fromDate(from));
    }

    return filterItems(expenses, filters);
  },

  getById: async(expenseId) => {
    return expenses.find(expense => expense.id === expenseId);
  },

  create: async(expense) => {
    const newExpense = {
      id: 0,
      userId: expense.userId,
      spentAt: expense.spentAt,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      note: expense.note,
    };

    await expenses.push(newExpense);

    return newExpense;
  },

  remove: async(expenseId) => {
    expenses = await expenses.filter(expense => expense.id !== expenseId);
  },

  update: async(expenseId, newExpense) => {
    const expense = await expensesService.getById(expenseId);

    Object.assign(expense, newExpense);

    return expense;
  },
};

module.exports = { expensesService };
