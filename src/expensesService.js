import { v4 as uuidv4 } from 'uuid';

import { functions } from './updateExpenseFunction.js';

// const functions = require('./updateExpenseFunction');

export function createExpense(body, expenses) {
  const expense = {
    id: uuidv4(),
    userId: body.userId,
    spentAt: body.spentAt,
    title: body.title,
    amount: body.amount,
    category: body.category,
    note: body.note,
  };

  expenses.push(expense);

  return expense;
}

export function getExpenseById(id, expenses) {
  const seekExpense = expenses.find((el) => el.id === id);

  return seekExpense;
}

export function deleteExpenseById(id, expenses) {
  const index = expenses.findIndex((el) => el.id === id);

  const item = expenses.splice(index, 1);

  return item;
}

export function updateExpenseById(id, body, expense) {
  const updateExpenseIndex = expense.findIndex((el) => el.id === id);

  functions.updateExpenseFunction(body, expense, updateExpenseIndex);

  // expense[updateExpenseIndex].spentAt =
  //   body.spentAt || expense[updateExpenseIndex].spentAt;

  // expense[updateExpenseIndex].title =
  //   body.title || expense[updateExpenseIndex].title;

  // expense[updateExpenseIndex].amount =
  //   body.amount || expense[updateExpenseIndex].amount;

  // expense[updateExpenseIndex].category =
  //   body.category || expense[updateExpenseIndex].category;

  // expense[updateExpenseIndex].note =
  //   body.note || expense[updateExpenseIndex].note;

  return expense[updateExpenseIndex];
}

export const expensesService = {
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
};
