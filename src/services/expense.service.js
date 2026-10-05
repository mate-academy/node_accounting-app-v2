const expenses = [];

const getAll = (userId, categories, from, to) => {
  if (!userId || !categories || !from || !to) {
    return null;
  }

  return expenses;
};

const getById = (id) => {
  return expenses.find((expens) => expens.id === +id) || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const ex = {
    id: Date.now(),
    userId: userId,
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

  Object.assign(expensUpdate, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expensUpdate;
};

const deletaById = (id) => {
  const index = expenses.findIndex((e) => e.id === +id);

  if (index === -1) {
    return null;
  }

  const exp = expenses.splice(index, 1);

  return exp;
};

const resetExpenses = () => {
  // eslint-disable-next-line no-const-assign
  expenses = [];
};

// const expensesService = {
//   getAll,
//   getById,
//   create,
//   upDate,
//   deletaById,
// };

module.exports = {
  getAll,
  getById,
  create,
  upDate,
  deletaById,
  resetExpenses,
};
