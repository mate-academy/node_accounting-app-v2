let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((expense) => Number(expense.id) === Number(id)) || null;
};

const create = ({ title, amount, category, note = '', userId, spentAt }) => {
  const expnese = {
    id: Date.now() + Math.random(),
    userId: userId,
    spentAt: spentAt || new Date().toISOString(),
    title,
    amount,
    category,
    note,
  };

  expenses.push(expnese);

  return expnese;
};

const update = (id, updateData) => {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, updateData);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => Number(expense.id) !== Number(id));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clearService: () => {
    expenses = [];
  },
};
