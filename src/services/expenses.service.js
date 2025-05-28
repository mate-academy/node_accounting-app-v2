const { v4: uuidv4 } = require('uuid');

const expensess = [];

const clearExpenses = () => {
  expensess.length = 0;
};

const getAllExpenses = ({ userId, categories, from, to }) => {
  const result = expensess.filter((expenses) => {
    const expenseDate = new Date(expenses.spentAt);
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    const withinDates =
      (!fromDate || expenseDate >= fromDate) &&
      (!toDate || expenseDate <= toDate);

    const userMatch = !userId || expenses.userId === +userId;
    const categoryMatch =
      !categories ||
      expenses.category.toLowerCase() === categories.toLowerCase();

    return userMatch && categoryMatch && withinDates;
  });

  return result;
};

const getExpenses = (id) => expensess.find((item) => item.id === +id);

const createExpenses = (body) => {
  const newExpense = {
    ...body,
    id: Number(uuidv4().replace(/[a-zA-Z]|-/g, '')),
  };

  expensess.push(newExpense);

  return newExpense;
};

const updateExpenses = (id, body) => {
  const expenses = getExpenses(id);

  if (expenses) {
    Object.assign(expenses, { ...body });
  }

  return expenses;
};

const removeExpenses = (id) => {
  const index = expensess.findIndex((item) => item.id === +id);

  if (index !== -1) {
    const [expenses] = expensess.splice(index, 1);

    return expenses;
  }
};

module.exports = {
  getAllExpenses,
  getExpenses,
  createExpenses,
  removeExpenses,
  updateExpenses,
  clearExpenses,
};
