const userService = require('../services/user.service.js');

let expenses = [];
let expenseIdCounter = 1;

const getAll = () => {
  return [...expenses];
};

const getById = (id) => {
  return expenses.find((item) => item.id === id) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const user = userService.getById(userId);

  if (!user) {
    return null;
  }

  const newExpense = {
    id: expenseIdCounter++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = ({ id, userId, spentAt, title, amount, category, note }) => {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, {
    id,
    userId: userId ?? expense.userId,
    spentAt: spentAt ?? expense.spentAt,
    title: title ?? expense.title,
    amount: amount ?? expense.amount,
    category: category ?? expense.category,
    note: note ?? expense.note,
  });

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const reset = () => {
  expenses = [];
  expenseIdCounter = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
