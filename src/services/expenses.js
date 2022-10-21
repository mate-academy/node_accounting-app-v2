'use strict';

let nextExpenseId = 1;

function postExpense(body, expenses) {
  const expense = {
    id: nextExpenseId++,
    ...body,
  };

  expenses.push(expense);

  return expense;
}

function getExpenses(normalizedURL, expenses) {
  const userId = normalizedURL.searchParams.get('userId');
  const category = normalizedURL.searchParams.get('category');
  const fromDate = normalizedURL.searchParams.get('from');
  const toDate = normalizedURL.searchParams.get('to');
  const numberFromDate = new Date(fromDate).getTime();
  const numberToDate = new Date(toDate).getTime();
  let copy = [ ...expenses ];

  if (userId !== null) {
    copy = copy.filter(expense => expense.userId === +userId);
  }

  if (category !== null) {
    copy = copy.filter(expense => expense.category === category);
  }

  if (fromDate !== null && toDate !== null) {
    copy = copy.filter(expense => {
      const expenseDate = new Date(expense.spentAt).getTime();

      return expenseDate < numberToDate && expenseDate > numberFromDate;
    });
  }

  return copy;
}

function getExpenseById(expenseId, expenses) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function deleteExpense(expenseId, expenses) {
  return expenses.filter(expense => expense.id !== +expenseId);
}

function updateExpense(foundExpense, title) {
  Object.assign(foundExpense, { title });
}

module.exports = {
  postExpense, getExpenseById, getExpenses, deleteExpense, updateExpense,
};
