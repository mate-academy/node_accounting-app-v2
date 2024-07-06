let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((item) => item.id === id) || null;
};

const generateUniqueId = () => {
  let id;

  do {
    id = Math.floor(Math.random() * 1000000);
  } while (expenses.some((expense) => expense.id === id));

  return id;
};

const create = (userId, spentAt, title, amount, category, note = '') => {
  const expense = {
    id: generateUniqueId(),
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

const remove = (id) => {
  const newExpenses = expenses.filter((item) => item.id !== id);
  const success = newExpenses.length !== expenses.length;

  if (success) {
    expenses = newExpenses;
  }

  return success;
};

const update = (id, updates) => {
  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    return null;
  }
  Object.assign(expense, updates);

  return expense;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetExpenses,
};
