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

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.userId === Number(id));
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: expenses.length,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const updateData = (id, data) => {
  const expense = getExpenseById(id);

  Object.assign(expense, data);

  return expense;
};

module.exports = {
  resetExpenses,
  getAllExpenses,
  getExpenseById,
  remove,
  updateData,
  createExpense,
};
