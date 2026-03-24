/* eslint-disable */
let nextId = 1;
let expenses = [];

// let expenses = [
//   {
//     id: 1,
//     userId: 1,
//     spentAt: '2026-03-24T19:17:24.700Z',
//     title: 'Buy a pen',
//     amount: 10,
//     category: 'small',
//     note: 'for writing',
//   },
//   {
//     id: 2,
//     userId: 1,
//     spentAt: '2026-03-23T14:10:12.000Z',
//     title: 'Buy a notebook',
//     amount: 25,
//     category: 'small',
//     note: 'for studying',
//   },
//   {
//     id: 3,
//     userId: 1,
//     spentAt: '2026-03-22T09:45:00.000Z',
//     title: 'Coffee',
//     amount: 5,
//     category: 'food',
//     note: 'morning drink',
//   },
// ];

function getAll({ userId, categories, from, to } = {}) {
  let result = expenses;

  if (userId) {
    result = result.filter((e) => e.userId === +userId);
  }

  if (categories) {
    result = result.filter((e) => e.category === categories);
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  return result;
}

function getById(id) {
  return expenses.find((item) => item.id === +id) || null;
}

function create({ userId, spentAt, title, amount, category, note }) {
  const expense = {
    id: nextId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
}

function update({ id, ...fields }) {
  const expense = getById(id);
  Object.assign(expense, fields);

  return expense;
}

function reset() {
  expenses = [];
  nextId = 1;
}

function remove(id) {
  expenses = expenses.filter((expense) => expense.id !== +id);
}

module.exports = {
  getAll,
  getById,
  create,
  reset,
  update,
  remove,
};
