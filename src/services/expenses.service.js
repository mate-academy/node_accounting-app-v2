/* eslint-disable function-paren-newline */
let expenses = [];

const getAll = (query) => {
  const { userId, categories, from, to } = query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId.toString() === userId.toString(),
    );
  }

  if (categories) {
    const categoryList = categories.split(',');

    filteredExpenses = filteredExpenses.filter((expense) =>
      categoryList.includes(expense.category),
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
  return (
    expenses.find((expense) => expense.id.toString() === id.toString()) || null
  );
};

const create = (query) => {
  const { userId, spentAt, title, amount, category, note } = query;

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

const remove = (id) => {
  const newExpenses = expenses.filter(
    (expense) => expense.id.toString() !== id.toString(),
  );

  expenses = newExpenses;
};

const update = (expenseById, req) => {
  Object.assign(expenseById, req.body);
};

const resetDate = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetDate,
};
