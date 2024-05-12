let expenses = [];
const getId = require('../utils/getCreateMaxId');

const expensesInit = () => {
  expenses = [];
};

const getExpenses = () => {
  return expenses;
};

const getExpense = (id) => {
  return expenses.find((expense) => expense.id === parseInt(id) || null);
};
const createExpence = (userId, title, amount, category, note) => {
  const expense = {
    id: getId.getCreateMaxId(expenses),
    userId,
    spentAt: new Date().toISOString(),
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== parseInt(id));
};

const updateExpence = (id, body) => {
  const expense = getExpense(id);

  Object.assign(expense, {
    ...body,
  });
  // Object.assign(expense, {
  //   id,
  //   userId,
  //   title,
  //   amount,
  //   category,
  //   note,
  // });

  return expense;
};

module.exports = {
  expensesInit,
  getExpenses,
  getExpense,
  createExpence,
  deleteExpense,
  updateExpence,
};
