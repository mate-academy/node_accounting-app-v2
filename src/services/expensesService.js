const { generateUniqueId } = require('../utils/uniqueGenerator');

let expenses = [];

const init = () => {
  expenses = [];
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = [...expenses];

  filteredExpenses = filteredExpenses.filter((item) => {
    if (userId && item.userId !== Number(userId)) {
      return false;
    }

    if (categories && item.category !== categories) {
      return false;
    }

    if (from && item.spentAt < from) {
      return false;
    }

    if (to && item.spentAt > to) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const create = (expenseData) => {
  const { userId, title, category, note } = expenseData;
  const spentAt = expenseData.spentAt || new Date().toISOString();
  const amount = expenseData.amount || 1;

  const newExpense = {
    userId,
    id: generateUniqueId(),
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

const update = ({ id, title }) => {
  const updatedExpense = getExpenseById(id);

  Object.assign(updatedExpense, {
    title,
  });

  return updatedExpense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  create,
  remove,
  update,
  init,
};
