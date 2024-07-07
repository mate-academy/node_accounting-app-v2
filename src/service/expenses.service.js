// eslint-disable-next-line no-unused-vars
const { Expenses } = require('../model/expenses.model');

const { getUserById } = require('./user.service');

/**
 * @type {Expenses[]}
 */
let expenses = [];

const getExpenses = (expensesURLParams) => {
  const { userId, categories, from, to } = expensesURLParams;

  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt >= from,
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt <= to,
    );
  }

  return filteredExpenses;
};

const createExpense = (expense) => {
  const userId = expense.userId;
  const title = expense.title;
  const amount = expense.amount;
  const category = expense.category;
  const note = expense.note;
  const spentAt = expense.spentAt;

  let newExpense;

  if (!userId || !title || !amount || !category) {
    return null;
  }

  const findUser = getUserById(userId);

  if (!findUser) {
    return undefined;
  }

  if (expenses.length !== 0) {
    newExpense = {
      id: expenses[expenses.length - 1].id + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };
  }

  if (expenses.length === 0) {
    newExpense = {
      id: expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };
  }

  expenses.push(newExpense);

  return newExpense;
};

const getExpenseById = (id) => {
  return expenses.find((expen) => expen.id === Number(id));
};

const deleteExpenseById = (id) => {
  const findExpense = getExpenseById(id);

  if (!findExpense) {
    return null;
  }

  expenses = expenses.filter((expen) => expen.id !== Number(id));

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

  return Object.assign(findExpense, expense);
};

module.exports = {
  updateExpense,
  deleteExpenseById,
  getExpenseById,
  createExpense,
  getExpenses,
  expenses,
};
