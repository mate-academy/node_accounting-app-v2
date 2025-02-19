let expenses = [];

const getAll = (query) => {
  const { userId, categories, from, to } = query;

  return expenses.filter((expense) => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categories) {
      // eslint-disable-next-line max-len
      const categoriesArr = Array.isArray(categories)
        ? categories
        : [categories];

      if (!categoriesArr.includes(expense.category)) {
        return false;
      }
    }

    if (from && new Date(expense.spentAt) < new Date(from)) {
      return false;
    }

    if (to && new Date(expense.spentAt) > new Date(to)) {
      return false;
    }

    return true;
  });
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: Date.now(),
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

const getById = (id) => {
  return expenses.find((expense) => expense.id === +id) || null;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const update = ({ id, title }) => {
  const expense = getById(id);

  if (expense) {
    expense.title = title;
  }

  return expense;
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  reset,
};
