let expenses = [];

const getId = () =>
  expenses.length > 0 ? Math.max(...expenses.map((u) => Number(u.id))) + 1 : 1;

const getAllExpenses = () => {
  return [...expenses];
};

const createExpenses = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: getId(),
    userId: Number(userId),
    spentAt,
    title,
    amount: Number(amount),
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const getExpense = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const deleteExpenses = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

const updateExpenses = (id, body) => {
  const expense = getExpense(+id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, body);

  return expense;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  createExpenses,
  getExpense,
  deleteExpenses,
  updateExpenses,
  resetExpenses,
};
