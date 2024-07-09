// eslint-disable-next-line no-unused-vars
const { Expenses } = require('../model/expenses.model');

const { getUserById } = require('./user.service');

const expenses = new Map();

const getExpenses = (expensesURLParams) => {
  const expensesAsArr = [...expenses.values()];
  const queries = Object.entries(expensesURLParams);

  if (!expensesURLParams || queries.length === 0) {
    return expensesAsArr;
  }

  const filteringFunctions = {
    userId: (userId, expense) => Number(userId) === expense.id,
    from: (from, expense) => new Date(expense.spentAt) >= new Date(from),
    to: (to, expense) => new Date(expense.spentAt) <= new Date(to),
    categories: (category, expense) => category === expense.category,
    default: (value, expense, key) => value === expense[key],
  };

  return expensesAsArr.filter((expense) => {
    return queries.every(([queryKey, queryVal]) => {
      const filteredFunc =
        filteringFunctions[queryKey] ?? filteringFunctions.default;

      return filteredFunc(queryVal, expense, queryKey);
    });
  });
};

const createExpense = (expense) => {
  const { userId, title, amount, category, note, spentAt } = expense;

  let newExpense;

  if (!userId || !title || !amount || !category) {
    return null;
  }

  const findUser = getUserById(userId);

  if (!findUser) {
    return undefined;
  }

  if (expenses.size !== 0) {
    newExpense = {
      id: expenses.get(expenses.size).id + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };
  }

  if (expenses.size === 0) {
    newExpense = {
      id: expenses.size + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };
  }

  expenses.set(newExpense.id, newExpense);

  return newExpense;
};

const getExpenseById = (id) => {
  return expenses.get(Number(id));
};

const deleteExpenseById = (id) => {
  const findExpense = getExpenseById(id);

  if (!findExpense) {
    return null;
  }

  expenses.delete(Number(id));

  return findExpense;
};

/**
 * @param {Expenses} expense
 * @param {number} id
 */
const updateExpense = (expense, id) => {
  const findExpense = getExpenseById(id);

  if (!findExpense) {
    return null;
  }

  const updatedExpense = Object.assign(findExpense, expense);

  expenses.set(id, updateExpense);

  return updatedExpense;
};

module.exports = {
  updateExpense,
  deleteExpenseById,
  getExpenseById,
  createExpense,
  getExpenses,
  expenses,
};
