let expenses = [];

function getAll({ userId, categories, from, to }) {
  let exp = [...expenses];

  if (userId) {
    exp = exp.filter((item) => item.userId === +userId);
  }

  if (categories) {
    exp = exp.filter((item) => categories.includes(item.category));
  }

  if (from) {
    const afterDate = new Date(from);

    exp = exp.filter((item) => new Date(item.spentAt) > afterDate);
  }

  if (to) {
    const beforeDate = new Date(to);

    exp = exp.filter((item) => new Date(item.spentAt) < beforeDate);
  }

  return exp;
}

const getById = (id) => {
  return expenses.find((item) => String(item.id) === id) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: Math.trunc(Date.now() + Math.random()),
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
  expenses = expenses.filter((expense) => String(expense.id) !== id);
};

const update = (id, dataToUpdate) => {
  const expense = getById(id);

  Object.assign(expense, dataToUpdate);

  return expense;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  resetExpenses,
};
