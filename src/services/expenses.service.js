let expenses = [];

function getRandomInt() {
  const min = 1;
  const max = 100;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const start = () => {
  expenses = [];
};

const getFilteredExpenses = (userId, categories, from, to) => {
  if (userId) {
    const filteredByUser = expenses.filter((e) => e.userId === +userId);

    if (categories) {
      const filteredByCategories = filteredByUser.filter(
        (e) => e.category === categories,
      );

      return filteredByCategories;
    }

    return filteredByUser;
  }

  if (from || to) {
    const filterByDates = expenses.filter(
      (e) => e.spentAt >= from && e.spentAt <= to,
    );

    return filterByDates;
  }

  return expenses;
};

const getExpById = (id) => {
  return expenses.find((e) => e.id === +id);
};

const create = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    userId,
    id: getRandomInt(),
    category,
    title,
    amount,
    note,
    spentAt,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = ({ id, title }) => {
  const expense = getExpById(id);

  Object.assign(expense, { title });

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((e) => e.id !== +id);
};

module.exports = {
  start,
  getFilteredExpenses,
  getExpById,
  create,
  update,
  remove,
};
