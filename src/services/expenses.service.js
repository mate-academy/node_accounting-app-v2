const { data } = require('../data');

const getAllExpenses = () => {
  return data.expenses;
};

const getById = (id) => {
  return data.expenses.find((exp) => exp.id === parseInt(id));
};

const normalizeCategory = (categories) => {
  return Array.isArray(categories) || !categories ? categories : [categories];
};

const filterExpensesById = (id) => {
  data.expenses = data.expenses.filter((exp) => exp.userId === parseInt(id));

  return data.expenses;
};

const filterExpensesByCategory = (category) => {
  return data.expenses.filter((exp) => category.includes(exp.category));
};

const filterExpensesByDate = (from, to) => {
  return data.expenses.filter((exp) => {
    const spentAt = new Date(exp.spentAt);

    return spentAt >= from && spentAt <= to;
  });
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const updatedExpense = {
    id: data.nextId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  data.expenses.push(updatedExpense);

  return updatedExpense;
};

const removeExpense = (id) => {
  data.expenses = data.expenses.filter((exp) => exp.id !== +id);

  return data.expenses;
};

const updateExpense = (exp, req) => {
  return Object.assign(exp, req.body);
};

module.exports = {
  getById,
  getAllExpenses,
  normalizeCategory,
  filterExpensesById,
  filterExpensesByCategory,
  filterExpensesByDate,
  create,
  removeExpense,
  updateExpense,
};
