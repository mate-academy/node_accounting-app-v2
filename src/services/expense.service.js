const expenses = [];

const getAll = (userId, categories, from, to) => {
  let exp = expenses;

  if (userId) {
    return (exp = exp.filter((item) => item.userId === +userId));
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
};

const getById = (id) => {
  return expenses.find((expens) => expens.id === +id) || null;
};

const create = ({ id, userId, spentAt, title, amount, category, note }) => {
  const ex = {
    id: Date.now(),
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(ex);

  return ex;
};

const upDate = ({ id, spentAt, title, amount, category, note }) => {
  const expensUpdate = expenses.find((e) => e.id === +id);

  if (!expensUpdate) {
    return null;
  }

  if (spentAt !== undefined) {
    expensUpdate.spentAt = spentAt;
  }

  if (title !== undefined) {
    expensUpdate.title = title;
  }

  if (amount !== undefined) {
    expensUpdate.amount = amount;
  }

  if (category !== undefined) {
    expensUpdate.category = category;
  }

  if (note !== undefined) {
    expensUpdate.note = note;
  }

  return expensUpdate;
};

const deleteById = (id) => {
  const index = expenses.findIndex((e) => e.id === +id);

  if (index === -1) {
    return null;
  }

  const [exp] = expenses.splice(index, 1);

  return exp;
};

const resetExpenses = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  upDate,
  deleteById,
  resetExpenses,
};
