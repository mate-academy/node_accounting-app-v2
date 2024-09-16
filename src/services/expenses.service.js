'use strict';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let expenses = [
  {
    id: 123,
    userId: 1,
    spentAt: '2022-10-19T11:01:43.462Z',
    title: 'Buy a new laptop',
    amount: 999,
    category: 'Electronics',
    note: 'I need a new laptop',
  },
];

const clearExpenses = () => {
  expenses = [];
};

const getAllExpenses = () => {
  return expenses;
};

const createExpenses = (expense) => {
  const newExpense = {
    id: getRandomInt(9000),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getExpensesById = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const deleteExpensesById = (id) => {
  const user = expenses.find(person => person.id === id) || null;

  if (!user) {
    return null;
  }

  expenses = expenses.filter(person => person.id !== id);

  return user;
};

const updateExpensesById = (id, fields) => {
  const user = expenses.find(person => person.id === id) || null;

  if (!user) {
    return null;
  }

  Object.assign(user, fields);

  return user;
};

module.exports = {
  getAllExpenses,
  createExpenses,
  getExpensesById,
  deleteExpensesById,
  updateExpensesById,
  clearExpenses,
};
