let expensesDb = [];
let nextId = 1;

const resetExpenses = () => {
  expensesDb = [];
  nextId = 1;
};

const getAllExpenses = ({ userId, categories, from, to } = {}) => {
  let result = [...expensesDb];

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];

    result = result.filter((e) => cats.includes(e.category));
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  return result;
};

const getExpense = (id) => {
  return expensesDb.find((e) => e.id === id);
};

const createExpense = (data) => {
  const expense = { ...data, id: nextId++ };

  expensesDb.push(expense);

  return expense;
};

const updateExpense = (id, data) => {
  const expense = getExpense(id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, data);

  return expense;
};

const deleteExpense = (id) => {
  const index = expensesDb.findIndex((e) => e.id === id);

  if (index === -1) {
    return false;
  }

  expensesDb.splice(index, 1);

  return true;
};

module.exports = {
  resetExpenses,
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
