let expenses = [];
let nextId = 1;

const getAllExpenses = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((exp) => exp.id === parseInt(id));
};

const normalizeCategory = (categories) => {
  return Array.isArray(categories) || !categories ? categories : [categories];
};

const filterExpensesById = (id) => {
  expenses = expenses.filter((exp) => exp.userId === parseInt(id));

  return expenses;
};

const filterExpensesByCategory = (category) => {
  return expenses.filter((exp) => category.includes(exp.category));
};

const filterExpensesByDate = (from, to) => {
  return expenses.filter((exp) => {
    const spentAt = new Date(exp.spentAt);

    return spentAt >= from && spentAt <= to;
  });
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const updatedExpense = {
    id: nextId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(updatedExpense);

  return updatedExpense;
};

const removeExpense = (id) => {
  expenses = expenses.filter((exp) => exp.id !== +id);

  return expenses;
};

const updateExpense = (exp, req) => {
  return Object.assign(exp, req.body);
};

const clearExpenses = () => {
  expenses = [];
  nextId = 1;
};

module.exports = {
  getById,
  getAllExpenses,
  clearExpenses,
  normalizeCategory,
  filterExpensesById,
  filterExpensesByCategory,
  filterExpensesByDate,
  create,
  removeExpense,
  updateExpense,
};
