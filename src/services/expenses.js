'use strict';

let expenses = [
  {
    id: 0,
    userId: 1,
    spentAt: '2022-11-21T13:35:39.907Z',
    title: 'Phone',
    amount: 0,
    category: 'Electronics',
    note: 'Buy new phone',
  },
];

function getAllExpenses(userId, from, to, category) {
  const filtredExpenses = expenses.filter(expense => (
    expense.userId === Number(userId)
    && category.includes(expense.category)
    && Date.parse(expense.spentAt) > Date.parse(from)
    && Date.parse(expense.spentAt) < Date.parse(to)
  ));

  return filtredExpenses;
}

function deleteExpense(expenseId) {
  const filtredExpenses = expenses.filter(expense => (
    expense.id !== Number(expenseId)
  ));

  if (expenses.length === filtredExpenses.length) {
    return false;
  }

  expenses = filtredExpenses;

  return true;
}

function getExpense(expenseId) {
  return expenses.find(
    expense => expense.id === Number(expenseId)
  );
}

function createNewExpense(userId, spentAt, title, amount, category, note) {
  let newId = 0;

  if (expenses.length) {
    newId = [...expenses].sort(
      (expenseA, expenseB) => expenseB.id - expenseA.id
    )[0].id + 1;
  }

  const newExpense = {
    id: newId,
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

function updateExpense(expenseId, spentAt, title, amount, category, note) {
  const findExpenses = expenses.find(expense => (
    expense.id === Number(expenseId)
  ));

  if (!findExpenses) {
    return null;
  }

  Object.assign(findExpenses, {
    spentAt, title, amount, category, note,
  });

  return findExpenses;
}

module.exports.getAllExpenses = getAllExpenses;
module.exports.getExpense = getExpense;
module.exports.deleteExpense = deleteExpense;
module.exports.createNewExpense = createNewExpense;
module.exports.updateExpense = updateExpense;
