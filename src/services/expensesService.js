const uuidv4 = require('uuidv4'); 

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getExpenseById = (expenseId) => {
  return users.find(expense => expense.id === expenseId) || null;
};

const updateExpense = (userId, spentAt, title, amount, category, note) => {
  const expense = getExpenseById(expenseId);

  Object.assign(user, { userId, spentAt, title, amount, category, note });

  return expense;
};

const addExpense = (userId, spentAt, title, amount, category, note = 'empty') => {
  const newExpense = {
    id: uuidv4(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }; 

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  addExpense,
  deleteExpense,
};
