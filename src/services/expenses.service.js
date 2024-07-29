let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = ({ userId, categories, from, to }) => {
  let filtered = expenses;

  if (userId) {
    filtered = filtered.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    filtered = filtered.filter((expense) => expense.category === categories);
  }

  if (from) {
    filtered = filtered.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filtered = filtered.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filtered;
};

const getOne = (id) => {
  return expenses.find((expense) => expense.userId === Number(id));
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: expenses.length,
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

const update = (id, data) => {
  const expense = getOne(id);

  Object.assign(expense, data);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  reset,
};
