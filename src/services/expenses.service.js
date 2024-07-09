let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getAllExpenses = ({ userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filteredExpenses;
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id: expenses.length,
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

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const updateExpense = (id, data) => {
  const expense = getExpenseById(id);

  Object.assign(expense, data);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((user) => user.id !== +id);
};

module.exports = {
  resetExpenses,
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
