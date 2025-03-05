let expenses = [];

const getAllExpenses = () => expenses;

const getId = () =>
  expenses.length > 0 ? Math.max(...expenses.map((u) => u.id)) + 1 : 1;

const getOne = (id) => {
  return expenses.find((expense) => expense.id === +id) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: getId(),
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

const deleteExpense = (id) => {
  expenses = expenses.filter((e) => e.id !== +id);

  return expenses;
};

const updateExpense = (id, body) => {
  const expense = getOne(+id);

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
  getOne,
  create,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
