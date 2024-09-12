const getRandomUserId = () => {
  return Math.floor(Math.random() * Date.now());
};

let expenses = [];

const getAll = (query) => {
  const { userId, categories, from, to } = query;

  expenses = expenses.filter((expense) => {
    if (userId && !categories) {
      if (expense.userId !== +userId) {
        return false;
      }

      return true;
    }

    if (categories) {
      if (Array.isArray(categories)) {
        const categoriesUpd = categories.map((item) => item.toLowerCase());

        if (!categoriesUpd.includes(expense.category)) {
          return false;
        }
      } else {
        if (expense.category.toLowerCase() !== categories.toLowerCase()) {
          return false;
        }
      }

      return true;
    }

    if (from && new Date(expense.spentAt) < new Date(from)) {
      return false;
    }

    if (to && new Date(expense.spentAt) > new Date(to)) {
      return false;
    }

    return true;
  });

  return expenses;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: getRandomUserId(),
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

  Object.assign(expense, {
    title,
  });

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
