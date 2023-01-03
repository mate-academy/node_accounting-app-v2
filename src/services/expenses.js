'use strict';

let expenses = [];

function runExpenses() {
  expenses = [];
}

function getAll(userId, category, from, to) {
  if (userId) {
    expenses = [expenses.find(expense => expense.id === Number(userId))];
  }

  if (from && to) {
    expenses = expenses.filter(
      expense => expense.spentAt >= from && expense.spentAt <= to,
    );
  }

  if (category) {
    expenses.filter(expense => expense.category === category);
  }

  return expenses;
}

function getOne(expenseId) {
  const foundExpense = expenses.find(
    expense => expense.id === Number(expenseId),
  );

  return foundExpense;
}

function addOne(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const maxId = Math.max(...expenses.map(expense => expense.id));

  const newExpense = {
    id: maxId > 0 ? maxId + 1 : 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteOne(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
}

function updateOne(expenseId, title) {
  const foundExpense = getOne(expenseId);

  Object.assign(foundExpense, { title });

  return foundExpense;
}

module.exports = {
  runExpenses,
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
