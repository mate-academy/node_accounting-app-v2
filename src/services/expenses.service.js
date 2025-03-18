const expenses = new Map();

const expensesService = {
  getAll: (filters = {}) => {
    let result = Array.from(expenses.values());

    if (filters.userId) {
      result = result.filter((exp) => exp.userId === Number(filters.userId));
    }

    if (filters.categories) {
      const categoriesArray = Array.isArray(filters.categories)
        ? filters.categories
        : [filters.categories];

      result = result.filter((exp) => categoriesArray.includes(exp.category));
    }

    if (filters.from) {
      result = result.filter(
        (exp) => new Date(exp.spentAt) >= new Date(filters.from),
      );
    }

    if (filters.to) {
      result = result.filter(
        (exp) => new Date(exp.spentAt) <= new Date(filters.to),
      );
    }

    return result;
  },

  getById: (id) => expenses.get(id),

  create: (expenseData) => {
    const expense = {
      id: Math.trunc(Date.now() + Math.random()),
      ...expenseData,
    };

    expenses.set(expense.id, expense);

    return expense;
  },

  removeById: (id) => {
    if (expenses.has(id)) {
      expenses.delete(id);

      return true;
    }

    return false;
  },

  updateById: (id, expenseData) => {
    if (!expenses.has(id)) {
      return null;
    }

    const existingExpense = expenses.get(id);
    const updatedExpense = { ...existingExpense, ...expenseData };

    expenses.set(existingExpense.id, updatedExpense);

    return updatedExpense;
  },

  clear: () => {
    expenses.clear();
  },
};

module.exports = {
  expensesService,
};
