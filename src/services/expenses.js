'use strict';

let expenses = [
  {
    id: 0,
    userId: 0,
    spentAt: '2023-08-20T12:18:58.631Z',
    title: 'I-phone',
    amount: 0,
    category: 'mobile',
    note: 'expensive mobile',
  },
  {
    id: 1,
    userId: 1,
    spentAt: "2023-07-20T12:19:43.631Z",
    title: 'Huawai',
    amount: 0,
    category: 'mobile',
    note: 'cheap mobile',
  }
];

function getExpenses() {
  return expenses;
};

function getExpense(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

function createExpense() {
  
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
};
