const findItemById = (arr, id) =>
  arr.find((item) => String(item.id) === String(id));

const getId = (arr) => {
  return arr.reduce((init, { id }) => {
    if (init <= id) {
      return id + 1;
    }

    return init;
  }, 1);
};

const getFilteredArray = (arr, id) => {
  if (!id) {
    return arr;
  }

  return [...arr].filter((item) => String(item.id) !== String(id));
};

const getFilteredExpenses = (expenses, query) => {
  const { userId, categories, from, to } = query;
  let filteredExpenses = expenses;

  filteredExpenses = userId
    ? expenses.filter((exp) => String(exp.userId) === String(userId))
    : expenses;

  filteredExpenses = categories
    ? expenses.filter((exp) => categories.includes(exp.category))
    : filteredExpenses;

  filteredExpenses = from
    ? filteredExpenses.filter((exp) => new Date(exp.spentAt) >= new Date(from))
    : filteredExpenses;

  filteredExpenses = to
    ? filteredExpenses.filter((exp) => new Date(exp.spentAt) <= new Date(to))
    : filteredExpenses;

  return filteredExpenses;
};

module.exports = {
  findItemById,
  getId,
  getFilteredArray,
  getFilteredExpenses,
};
