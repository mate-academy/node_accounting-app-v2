let expenses = [];

const expensesService = {
  getAll: (filters = {}) => {
    let currentExpenses = [...expenses];

    if (filters.userId) {
      currentExpenses = currentExpenses.filter(
        (expense) => expense.userId === +filters.userId,
      );
    }

    if (filters.categories) {
      const categoriesArray = Array.isArray(filters.categories)
        ? filters.categories
        : [filters.categories];

      currentExpenses = currentExpenses.filter((expense) => {
        return categoriesArray.includes(expense.category);
      });
    }

    if (filters.from) {
      currentExpenses = currentExpenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(filters.from),
      );
    }

    if (filters.to) {
      currentExpenses = currentExpenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(filters.to),
      );
    }

    return currentExpenses;
  },

  getExpenseById: (id) => expenses.find((expense) => expense.id === id),

  create: (expenseData) => {
    const id = Math.floor(Date.now() + Math.random());
    const newExpense = { id, ...expenseData };

    expenses.push(newExpense);

    return newExpense;
  },

  remove: (id) => {
    const expenseToDelete = expenses.find((expense) => expense.id === id);

    if (expenseToDelete) {
      expenses = expenses.filter(
        (expense) => expense.id !== expenseToDelete.id,
      );
    }

    return expenseToDelete;
  },

  update: (id, expenseData) => {
    const expenseIndex = expenses.findIndex((expense) => expense.id === id);

    if (expenseIndex === -1) {
      return null;
    }

    const newExpense = {
      ...expenses[expenseIndex],
      ...expenseData,
    };

    expenses[expenseIndex] = newExpense;

    // console.log('Updated expense:', newExpense);

    return newExpense;
  },

  clear: () => {
    expenses = [];
  },
};

module.exports = {
  expensesService,
};
