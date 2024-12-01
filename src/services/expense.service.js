let expenses = [];
let nextId = 1;

const resetExpenses = () => {
  expenses = [];
  nextId = 1;
};

const getAll = (category, userId, from, to) => {
  let filteredExpenses = [...expenses];

  if (category) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
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

const getById = (id) => {
  const expenseId = Number(id);

  return expenses.find((expense) => expense.id === expenseId) || null;
};

const create = ({ userId, title, amount, category, note, spentAt }) => {
  const newExpense = {
    id: nextId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  nextId++;

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  const filteredExpenses = expenses.filter((item) => item.id !== id);

  expenses = filteredExpenses;

  return expenses;
};

const update = ({ id, data }) => {
  const expense = getById(id);

  const newExpense = {
    ...expense,
  };

  for (const key in data) {
    if (data[key]) {
      newExpense[key] = data[key];
    }
  }

  Object.assign(expense, newExpense);

  return newExpense;
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
  resetExpenses,
};
