'use strict';

let expenses = [
  // {
  //   id: 1,
  //   userId: 1,
  //   spentAt: '2015-07-20T15:49:04-07:00',
  //   title: 'string',
  //   amount: 5,
  //   category: 'string 2',
  //   note: 'string',
  // },
  // {
  //   id: 2,
  //   userId: 2,
  //   spentAt: '2016-07-20T15:49:04-07:00',
  //   title: 'string',
  //   amount: 12,
  //   category: 'string 4',
  //   note: 'string',
  // },
];

function resetExpenses() {
  expenses = [];
}

function getAll() {
  return expenses;
}

function findById(expenseId) {
  return expenses.find(({ id }) => id === +expenseId);
}

function create(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const nextId = expenses
    .reduce((prev, cur) => prev.id > cur.id ? prev : cur).id + 1;

  const newExpense = {
    id: nextId,
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

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const foundExpense = findById(id);

  Object.assign(foundExpense, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return foundExpense;
}

module.exports = {
  getAll,
  findById,
  create,
  remove,
  update,
  resetExpenses,
};
