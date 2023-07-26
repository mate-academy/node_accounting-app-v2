'use strict';

const {
  createFilterExpenseFactory,
} = require('../helpers/createFilterExpenseFactory');
const { filterItems } = require('../utils/filterItems');
const { generateId } = require('../utils/generateId');

let expenses = [];

function setInitialExpenses() {
  expenses = [];
}

class ExpensesService {
  async getAll(userId, categories, from, to) {
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
  }

  async getById(expenseId) {
    return expenses.find(expense => expense.id === expenseId);
  }

  async create(expense) {
    const newId = generateId(expenses);
    const newExpense = {
      id: newId,
      userId: expense.userId,
      spentAt: expense.spentAt,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      note: expense.note,
    };

    await expenses.push(newExpense);

    return newExpense;
  }

  async remove(expenseId) {
    expenses = await expenses.filter(expense => expense.id !== expenseId);
  }

  async update(expenseId, newExpense) {
    const expense = await this.getById(expenseId);

    Object.assign(expense, newExpense);

    return expense;
  }
};

module.exports = {
  ExpensesService,
  setInitialExpenses,
};
