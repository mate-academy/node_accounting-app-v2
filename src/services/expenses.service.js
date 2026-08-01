let expenses = [];
let nextId = 0;

const getAll = ({ userId, from, to, categories }) => {
  let result = expenses;

  if (userId) {
    result = result.filter((expense) => expense.userId === Number(userId));
  }

  if (from) {
    result = result.filter((expense) => expense.spentAt >= from);
  }

  if (to) {
    result = result.filter((expense) => expense.spentAt <= to);
  }

  if (categories) {
    result = result.filter((expense) => {
      return categories.includes(expense.category);
    });
  }

  return result;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: nextId++,
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
  expenses = expenses.filter((expense) => {
    return expense.id !== Number(id);
  });
};

const update = (id, data) => {
  const prevData = getById(id);

  return Object.assign(prevData, data);
};

const reset = () => {
  expenses = [];
  nextId = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
