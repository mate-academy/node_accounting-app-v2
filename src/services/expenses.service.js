let expenses = [];

const start = () => {
  expenses = [];
};

const getAll = (params) => {
  const { userId, categories, from, to } = params;
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    const categoriesArray = categories.split(',');

    // eslint-disable-next-line prettier/prettier
    filteredExpenses = filteredExpenses.filter(
      (expense) => categoriesArray.includes(expense.category),
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt >= from && expense.spentAt <= to,
    );
  }

  return filteredExpenses;
};

const getById = (id) => expenses.find((expense) => expense.id === +id) || null;

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteById = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const updateById = (keys) => {
  const expense = getById(keys.id);

  Object.assign(expense, {
    ...keys,
  });

  return expense;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
