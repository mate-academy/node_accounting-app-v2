const expenses = require('../api/mockExpenses');

const expenseRepository = {
  create: (expenseData) => {
    const id = expenses.size + 1;
    const newExpense = {
      id,
      ...expenseData,
    };

    expenses.set(id, newExpense);

    return newExpense;
  },

  findAll: (filters = {}) => {
    const expensesArray = [...expenses.values()];

    const filteringFunctions = {
      userId: (userId, expense) => Number(userId) === expense.userId,
      from: (from, expense) => new Date(expense.spentAt) >= new Date(from),
      to: (to, expense) => new Date(expense.spentAt) <= new Date(to),
      categories: (category, expense) =>
        category.toLowerCase() === expense.category.toLowerCase(),
      default: (value, expense, key) => value === expense[key],
    };

    const queries = Object.entries(filters);
    /* eslint-disable */
    return expensesArray.filter((expense) =>
      queries.every(([queryKey, queryVal]) => {
        const filterFunction =
          filteringFunctions[queryKey] ?? filteringFunctions.default;

        return filterFunction(queryVal, expense, queryKey);
      }),
    );
  },
  /* eslint-enable */

  /* eslint-disable */
  findByPk: (expenseId) => {
    return expenses.get(Number(expenseId));
  },
  /* eslint-enable */

  findOne: (field, value) => {
    return [...expenses.values()].find((expense) => expense[field] === value);
  },

  update: (expenseId, expenseData) => {
    const { title, amount, category, note } = expenseData;

    const updatedExpense = expenses.get(Number(expenseId));

    updatedExpense.title = title ?? updatedExpense.title;
    updatedExpense.amount = amount ?? updatedExpense.amount;
    updatedExpense.category = category ?? updatedExpense.category;
    updatedExpense.note = note ?? updatedExpense.note;

    expenses.set(Number(expenseId), updatedExpense);

    return updatedExpense;
  },

  destroy: (expenseId) => {
    const deletedExpense = expenses.get(Number(expenseId));

    expenses.delete(Number(expenseId));

    return deletedExpense;
  },

  resetExpenses: () => {
    expenses.clear();
  },
};

module.exports = expenseRepository;
