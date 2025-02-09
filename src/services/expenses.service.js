let expenses = [];
let id = 0;

const resetExpenses = () => {
  expenses = [];
};

const getAllExpenses = ({ userId, categories, from, to }) => {
  let filtered = expenses;

  if (userId) {
    filtered = filtered.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    filtered = filtered.filter((expense) => expense.category === categories);
  }

  if (from) {
    filtered = filtered.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filtered = filtered.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filtered;
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  id++;
  expenses.push(newExpense);

  return newExpense;
};

const getExpenseById = (expenseId) => {
  const findExpense = expenses.find((expense) => expense.id === +expenseId);

  return findExpense;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter((expense) => expense.id !== +expenseId);
};

const updateExpense = (expenseId, data) => {
  const findExpense = expenses.find((expense) => expense.id === +expenseId);

  Object.assign(findExpense, data);

  return findExpense;
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
