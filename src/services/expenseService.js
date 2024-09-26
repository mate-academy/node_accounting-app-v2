'use strict';

let expenses = [];

function createNewExpenseId(params) {
  const arrayOfIds = params.map(param => param.id);

  const maxId = arrayOfIds.length ? Math.max(...arrayOfIds) : 0;

  return maxId + 1;
}

function deleteAllExpenses() {
  expenses = [];
}

function getAll(params) {
  const { userId, category, from, to } = params;

  if (!expenses.length) {
    return [];
  }

  return expenses.filter(expense => {
    const isUserId = userId
      ? expense.userId === +userId
      : true;

    const isCategory = category
      ? expense.category === category
      : true;

    const isForm = from
      ? expense.spentAt >= from
      : true;

    const isTo = to
      ? expense.spentAt <= to
      : true;

    const isEveryParamsValid = isUserId && isCategory && isForm && isTo;

    if (isEveryParamsValid) {
      return true;
    }

    return false;
  });
}

function createExpense(expense) {
  const newExpense = {
    id: createNewExpenseId(expenses),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
}

function findExpenseById(expenseId) {
  const requireExpense = expenses.find(
    expense => expense.id === Number(expenseId)
  );

  return requireExpense || null;
}

function deleteExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
}

function updateExpense(expenseId, params) {
  const expense = findExpenseById(expenseId);

  Object.assign(expense, params);

  return expense;
}

module.exports = {
  deleteAllExpenses,
  getAll,
  createExpense,
  findExpenseById,
  deleteExpense,
  updateExpense,
};
