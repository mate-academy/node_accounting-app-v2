/* eslint-disable function-paren-newline */
'use strict';

const {
  isValidUserId,
  isValidDate,
  isNonEmptyString,
  isValidNumber,
  isValidNote,
  isValidDateOrUndefined,
  isNonEmptyStringOrUndefined,
  isNumberOrUndefined,
} = require('../validators/expenseValidators');

const { generateId } = require('../helper/generateId');

const expensesWrapper = {
  expenses: [],
};

const getExpenses = ({ userId, categories, from, to }) => {
  let filteredExpenses = [...expensesWrapper.expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category),
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

const getExpenseById = (id) => {
  const expenseId = +id;

  return expensesWrapper.expenses.find((expense) => expense.id === expenseId);
};

const createExpense = (items) => {
  const newExpense = {
    id: generateId(expensesWrapper.expenses),
    ...items,
  };

  expensesWrapper.expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (id) => {
  const expenseId = +id;

  expensesWrapper.expenses = expensesWrapper.expenses.filter(
    (expense) => expense.id !== expenseId,
  );
};

const updateExpense = (id, items) => {
  const expense = getExpenseById(id);

  if (!expense) {
    throw new Error(`Expense with ID ${id} not found.`);
  }

  Object.assign(expense, { ...items });

  return expense;
};

const validateCreation = (items) => {
  const { userId, spentAt, title, amount, category, note } = items;

  const arePropsValid =
    isValidUserId(userId) &&
    isValidDate(spentAt) &&
    isNonEmptyString(title) &&
    isValidNumber(amount) &&
    isNonEmptyString(category) &&
    isValidNote(note);

  const validatedProps = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  return [arePropsValid, validatedProps];
};

const validateUpdate = (items) => {
  const { spentAt, title, amount, category, note } = items;

  const arePropsValid =
    isValidDateOrUndefined(spentAt) &&
    isNonEmptyStringOrUndefined(title) &&
    isNumberOrUndefined(amount) &&
    isNonEmptyStringOrUndefined(category) &&
    isNonEmptyStringOrUndefined(note);

  const validatedItems = {
    spentAt,
    title,
    amount,
    category,
    note,
  };

  Object.keys(validatedItems).forEach((key) => {
    if (validatedItems[key] === undefined) {
      delete validatedItems[key];
    }
  });

  return [arePropsValid, validatedItems];
};

const clearExpenses = () => {
  expensesWrapper.expenses = [];
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  validateCreation,
  validateUpdate,
  clearExpenses,
};
