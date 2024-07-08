const mockExpenses = require('../api/mockExpenses');

const expenseRepository = {
  create: (expenseData) => {
    const newExpense = {
      id: mockExpenses.length + 1,
      ...expenseData,
    };

    mockExpenses.push(newExpense);

    return newExpense;
  },

  findAll: (filters) => {
    let expenses = mockExpenses;

    const { userId, from, to, categories } = filters;

    if (userId) {
      expenses = expenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (from) {
      const fromDate = new Date(from);

      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (to) {
      const toDate = new Date(to);

      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) <= toDate,
      );
    }

    if (categories && categories.length > 0) {
      /* eslint-disable */
      const normalizedCategories = Array.isArray(categories)
        ? categories.map(cat => cat.toLowerCase())
        : categories.split(',').map(cat => cat.trim().toLowerCase());

      if (normalizedCategories.length > 0) {
        expenses = expenses.filter((expense) =>
          normalizedCategories.includes(expense.category.toLowerCase())
        );
      }
      /* eslint-enable */
    }

    return expenses;
  },

  findByPk: (expenseId) => {
    return mockExpenses.find((expense) => expense.id === Number(expenseId));
  },

  findOne: (field, value) => {
    return mockExpenses.find((expense) => expense[field] === value);
  },

  update: (expenseId, expenseData) => {
    const { title, amount, category, note } = expenseData;

    const updatedExpense = mockExpenses.find(
      (expense) => expense.id === Number(expenseId),
    );

    updatedExpense.title = title ?? updatedExpense.title;
    updatedExpense.amount = amount ?? updatedExpense.amount;
    updatedExpense.category = category ?? updatedExpense.category;
    updatedExpense.note = note ?? updatedExpense.note;

    return updatedExpense;
  },

  destroy: (expenseId) => {
    const expenseIndex = mockExpenses.findIndex(
      (expense) => expense.id === Number(expenseId),
    );

    return mockExpenses.splice(expenseIndex, 1)[0];
  },

  resetExpenses: () => {
    mockExpenses.length = 0;
  },
};

module.exports = expenseRepository;
