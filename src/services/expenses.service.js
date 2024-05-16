const { uuidToNumeric } = require('../uuidToNumeric');

let expenses = [];

const reset = () => {
  expenses = [];

  return expenses;
};

const getAllExpenses = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => categories.includes(expense.category),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }

  return filteredExpenses;
};

const createNewExpense = (data) => {
  const newExpense = {
    id: uuidToNumeric(),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === +id) || null;
};

const removeExpenseById = (id) => {
  const newExpenses = expenses.filter((expense) => expense.id !== +id);

  expenses = newExpenses;
};

const updateExpenseById = (id, data) => {
  const expense = getExpenseById(id);

  Object.assign(expense, { ...data });

  return expense;
};

module.exports = {
  reset,
  getAllExpenses,
  createNewExpense,
  getExpenseById,
  removeExpenseById,
  updateExpenseById,
};
