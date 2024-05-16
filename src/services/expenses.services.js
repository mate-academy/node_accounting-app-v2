const { getUserById } = require('./user.services');

let expenses = [];

const get = (userId, categories = [], from, to) => {
  return expenses.filter((expense) => {
    const idMatch = !userId || expense.userId === +userId;

    const categoryMatch =
      categories.length === 0 ||
      categories.split(',').includes(expense.category);

    const fromDate = from ? new Date(from) : null;

    const toDate = to ? new Date(to) : null;

    const dateMatch =
      (!fromDate || new Date(expense.spentAt) >= fromDate) &&
      (!toDate || new Date(expense.spentAt) <= toDate);

    return idMatch && categoryMatch && dateMatch;
  });
};

const getById = (id) => {
  const expense = expenses.find((exp) => exp.id === Number(id));

  if (!expense) {
    throw new Error('Expense not found');
  }

  return expense;
};

const add = (userId, expenseData) => {
  const user = getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const newExpense = {
    id: Date.now(),
    userId,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  if (index === -1) {
    throw new Error('Expense not found');
  }

  expenses.splice(index, 1);
};

const update = (id, expenseData) => {
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  if (index === -1) {
    throw new Error('Expense not found');
  }

  expenses[index] = {
    ...expenses[index],
    ...expenseData,
  };

  return expenses[index];
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  get,
  add,
  getById,
  remove,
  update,
  resetExpenses,
};
