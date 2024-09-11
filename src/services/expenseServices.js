/* eslint-disable no-console */
/* eslint-disable function-paren-newline */
/* eslint-disable max-len */
const mockExpenses = new Map();

const getAllExpenses = (query) => {
  const expensesArray = [...mockExpenses.values()];

  if (!query || Object.keys(query).length === 0) {
    return expensesArray;
  }

  const filteringFunctions = {
    userId: (userId, expense) => Number(userId) === expense.userId,
    from: (from, expense) => new Date(expense.spentAt) >= new Date(from),
    to: (to, expense) => new Date(expense.spentAt) <= new Date(to),
    categories: (category, expense) =>
      category.toLowerCase() === expense.category.toLowerCase(),
    default: (value, expense, key) => value === expense[key],
  };

  return expensesArray.filter((expense) =>
    Object.entries(query).every(([queryKey, queryVal]) => {
      const filterFunction =
        filteringFunctions[queryKey] ?? filteringFunctions.default;

      return filterFunction(queryVal, expense, queryKey);
    }),
  );
};

const getExpenseById = (id) => {
  return mockExpenses.get(id);
};

const createExpense = (expense) => {
  const id = Math.max(...mockExpenses.keys(), 0) + 1;
  const newExpense = { id, ...expense };

  mockExpenses.set(id, newExpense);

  return newExpense;
};

const deleteExpenseById = (id) => {
  const expenseToRemove = mockExpenses.get(Number(id));

  mockExpenses.delete(id);

  return expenseToRemove;
};

const updateExpenseById = ({ id, ...rest }) => {
  const expenseToUpdate = getExpenseById(id);

  if (!expenseToUpdate) {
    return;
  }

  const newExpense = { ...expenseToUpdate, ...rest };

  mockExpenses.set(id, newExpense);

  return newExpense;
};

const resetMockExpenses = () => {
  mockExpenses.clear();
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpenseById,
  updateExpenseById,
  resetMockExpenses,
};
