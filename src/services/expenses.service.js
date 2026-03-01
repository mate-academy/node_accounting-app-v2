const expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const create = ({ id, userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: Date.now(),
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

const deleteById = (id) => {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return;
  }

  const [deletedExpense] = expenses.splice(index, 1);

  return deletedExpense;
};

const update = ({ id, ...data }) => {
  const expense = expenses.find((expenseItem) => expenseItem.id === id);

  if (!expense) {
    return expense;
  }

  return Object.assign(expense, data);
};

const reset = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  reset,
};
