let expenses = [];
let currentId = 1;

const resetExpenses = () => {
  expenses = [];
};

const getAllExpenses = () => {
  return expenses;
};

const getExpenceById = (id) => {
  return expenses.find((expence) => expence.id === +id) || null;
};

const createExpence = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: currentId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  currentId++;
  expenses.push(expense);

  return expense;
};

const patchExpence = (id, data) => {
  const expense = getExpenceById(id);

  Object.assign(expense, data);

  return expense;
};

const deleteExpence = (id) => {
  expenses = expenses.filter((expence) => expence.id !== +id);
};

module.exports = {
  resetExpenses,
  getAllExpenses,
  getExpenceById,
  createExpence,
  patchExpence,
  deleteExpence,
};
