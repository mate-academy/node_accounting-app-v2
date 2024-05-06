let expenses = [];

const getAll = () => expenses;

const getById = (id) => expenses.find((expense) => expense.id === id) || null;

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: expenses.length + 1,
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

const deleteById = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const updateById = ({ id, userId, spentAt, title, amount, category, note }) => {
  const expense = getById(id);

  Object.assign(expense, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
