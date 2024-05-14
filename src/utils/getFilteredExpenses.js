const getFilteredExpenses = (expenses, query) => {
  const { userId, categories, from, to } = query;

  return expenses.filter((expense) => {
    let isFiltered = true;

    if (userId && expense.userId !== Number(userId)) {
      isFiltered = false;
    }

    if (categories && !categories.includes(expense.category)) {
      isFiltered = false;
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const spentAtDate = new Date(expense.spentAt);

      if (!(spentAtDate >= fromDate && spentAtDate <= toDate)) {
        isFiltered = false;
      }
    }

    return isFiltered;
  });
};

module.exports = getFilteredExpenses;
