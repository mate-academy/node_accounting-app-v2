// let expenses = [];
const { getId } = require('../utils/utils.js');
let expenses;

function getAll() {
  return expenses;
}

function getOne(id) {
  return expenses.find((item) => item.id.toString() === id.toString()) || null;
}

function createOne(expenseData) {
  const { userId, spentAt, title, amount, category, note } = expenseData;
  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
    id: getId(expenses),
  };

  expenses.push(expense);

  return expense;
}

function deleteOne(id) {
  const expense = getOne(id);

  if (!expense) {
    return false;
  }

  expenses = expenses.filter((item) => item.id.toString() !== id.toString());

  return true;
}

function updateOne(id, expenseData) {
  const expense = getOne(id);

  if (!expense) {
    return false;
  }

  for (const key in expenseData) {
    expense[key] = expenseData[key];
  }

  // Object.assign(expense, expenseData);

  return expense;
}

const createService = () => {
  expenses = [
    // {
    // id: 1,
    // userId: 1,
    // spentAt: '2022-10-19T11:01:43.462Z',
    // title: 'Buy a new laptop',
    // amount: 999,
    // category: 'Electronics',
    // note: 'I need a new laptop'
    // }
  ];

  return {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
  };
};

module.exports = {
  createService,
};
