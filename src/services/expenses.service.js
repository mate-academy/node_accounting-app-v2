let expenses = [];
let nextExpenseId = 0;

const getAll = ({ userId, from, to, categories }) => {
  let filteredExpenses = expenses;

  if (userId !== undefined) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (from !== undefined && to === undefined) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  } else if (from === undefined && to !== undefined) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  } else if (from !== undefined && to !== undefined) {
    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        new Date(expense.spentAt) >= new Date(from) &&
        new Date(expense.spentAt) <= new Date(to),
    );
  }

  if (Array.isArray(categories)) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  } else if (categories !== undefined) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === id) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  nextExpenseId++;

  const expense = {
    id: nextExpenseId,
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

const update = ({ id, userId, spentAt, title, amount, category, note }) => {
  const expense = getById(id);
  const updates = {};

  if (userId !== undefined) {
    updates.userId = userId;
  }

  if (spentAt !== undefined) {
    updates.spentAt = spentAt;
  }

  if (title !== undefined) {
    updates.title = title;
  }

  if (amount !== undefined) {
    updates.amount = amount;
  }

  if (category !== undefined) {
    updates.category = category;
  }

  if (note !== undefined) {
    updates.note = note;
  }

  Object.assign(expense, updates);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const reset = () => {
  expenses = [];
  nextExpenseId = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
