const getFilteredExpenses = (expenses, query) => {
  return expenses.filter((expense) => {
    let isFiltered = true;

    if (query.categories) {
      isFiltered = isFiltered && expense.category === query.categories;
    }

    if (query.userId) {
      isFiltered = isFiltered && expense.userId === +query.userId;
    }

    if (query.from && query.to) {
      isFiltered =
        new Date(expense.spentAt) > new Date(query.from) &&
        new Date(expense.spentAt) < new Date(query.to);
    }

    return isFiltered;
  });
};

module.exports = {
  getFilteredExpenses,
};
