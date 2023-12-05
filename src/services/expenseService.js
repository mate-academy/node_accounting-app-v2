'use strict';

const { getAllUsersId } = require('./userService.js');

let expenses = [];
let maxExpenseId = 0;

const clearExpensesBeforeStart = () => {
  expenses = [];
  maxExpenseId = 0;
};

const getAllExpenses = (userId, categories, from, to, res) => {
  let expensesToReturn = [...expenses];

  if (userId !== undefined) {
    const allUsersId = getAllUsersId();

    if (!allUsersId.includes(+userId)) {
      res.statusCode = 404;

      return res.send();
    }

    expensesToReturn = expenses
      .filter(expense => +expense.userId === +userId);
  }

  if (categories && categories.length) {
    expensesToReturn = expensesToReturn
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    expensesToReturn = expensesToReturn
      .filter(expense => expense.spentAt >= from);
  }

  if (to) {
    expensesToReturn = expensesToReturn
      .filter(expense => expense.spentAt <= to);
  }

  return expensesToReturn;
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id: maxExpenseId,
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(newExpense);
  maxExpenseId++;

  return newExpense;
};

const getAllExspensesId = () => {
  return expenses.map(expense => +expense.id);
};

const findExpenseById = (id) => {
  const foundExpense = expenses.find(user => user.id === id);

  return foundExpense;
};

const removeExpense = (id) => {
  expenses = expenses.filter(user => +user.id !== id);
};

const updateExpense = (
  id,
  spentAt,
  title,
  amount,
  category,
  note) => {
  const expense = findExpenseById(id);

  Object.assign(expense, {
    spentAt: spentAt || expense.spentAt,
    title,
    amount: amount ? +amount : expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  });

  return expense;
};

module.exports = {
  clearExpensesBeforeStart,
  getAllExpenses,
  createExpense,
  getAllExspensesId,
  findExpenseById,
  removeExpense,
  updateExpense,
};
