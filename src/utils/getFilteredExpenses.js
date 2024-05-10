const getFilteredExpenses = (expenses, query) => {
  return expenses.filter((expense) => {
    if (query.categories) {
      return expense.category === query.categories;
    }

    if (query.userId) {
      return expense.userId === +query.userId;
    }

    if (query.from && query.to) {
      return (
        new Date(expense.spentAt) > new Date(query.from) &&
        new Date(expense.spentAt) < new Date(query.to)
      );
    }

    return true;
  });
};

module.exports = {
  getFilteredExpenses,
};
