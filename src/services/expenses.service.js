let expenses = [];
let nextExpenseId = 1;

const reset = () => {
  expenses = [];
  nextExpenseId = 1;
};

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((e) => e.id === Number(id)) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
    id: nextExpenseId++,
  };

  expenses.push(expense);

  return expense;
};

const update = ({ id, ...fields }) => {
  const expense = expenses.find((e) => e.id === Number(id));

  if (!expense) {
    return null;
  }

  Object.assign(expense, {
    ...fields,
  });

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((e) => e.id !== Number(id));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
