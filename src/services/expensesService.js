let expenses = [];
let nextId = 1;

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((exp) => exp.id === id) || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: nextId++,
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

  Object.assign(expense, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((exp) => exp.id !== id);
};

const reset = () => {
  expenses = [];
  nextId = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
