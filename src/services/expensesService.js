'use strict';

const {
  createFilterExpenseFactory,
} = require('../helpers/createFilterExpenseFactory');
const { filterItems } = require('../utils/filterItems');

let expenses = [{
  amount: 999,
  category: 'Electronics',
  id: 0,
  note: 'I need a new laptop',
  spentAt: '2022-11-19T11:01:43.462Z',
  title: 'Buy a new laptop',
  userId: 0,
}, {
  amount: 999,
  category: 'TV',
  id: 0,
  note: 'I need a new laptop',
  spentAt: '2022-05-19T11:01:43.462Z',
  title: 'Buy a new laptop',
  userId: 1,
}, {
  amount: 999,
  category: 'BBaa',
  id: 0,
  note: 'I need a new laptop',
  spentAt: '2022-02-19T11:01:43.462Z',
  title: 'Buy a new laptop',
  userId: 2,
}, {
  amount: 999,
  category: 'Electronics',
  id: 0,
  note: 'I need a new laptop',
  spentAt: '2012-10-19T11:01:43.462Z',
  title: 'Buy a new laptop',
  userId: 0,
}, {
  amount: 999,
  category: 'Electronics',
  id: 0,
  note: 'I need a new laptop',
  spentAt: '2022-10-09T11:01:43.462Z',
  title: 'Buy a new laptop',
  userId: 0,
}];

const expensesService = {
  getAll: async(userId, categories, from, to) => {
    const filters = [];

    if (userId) {
      filters.push(createFilterExpenseFactory.byUserId(userId));
    }

    if (categories && categories.length) {
      const query = Array.isArray(categories)
        ? categories
        : [categories];

      filters.push(createFilterExpenseFactory.byCategories(query));
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
