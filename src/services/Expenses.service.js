function createExpensesService() {
  const expenses = [];

  return {
    getAllExpenses: (userId, categories, from, to) => {
      const fromTime = from ? Date.parse(from) : -Infinity;
      const toTime = to ? Date.parse(to) : Infinity;

      return expenses.filter((expense) => {
        if (!expense) {
          return false;
        }

        const spentAt = Date.parse(expense.spentAt);

        return (
          (userId === undefined || String(expense.userId) === userId) &&
          Number.isFinite(spentAt) &&
          spentAt >= fromTime &&
          spentAt <= toTime &&
          (!categories.length || categories.includes(expense.category))
        );
      });
    },

    createExpenses: (userId, spentAt, title, amount, category, note) => {
      const newExpenses = {
        id: expenses.length,
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      };

      expenses.push(newExpenses);

      return newExpenses;
    },

    getExpensesById: (id) => expenses[id],

    updateExpensesById: (id, updates) => {
      if (!expenses[id]) {
        return null;
      }

      expenses[id] = { ...expenses[id], ...updates };

      return expenses[id];
    },

    deleteExpensesById: (id) => {
      if (!expenses[id]) {
        return null;
      }
      expenses[id] = null;
    },
  };
}

module.exports = {
  createExpensesService,
};
