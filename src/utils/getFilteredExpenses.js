const getFilteredExpenses = (expenses, query) => {
  const { userId, categories, from, to } = query;
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => categories.includes(expense.category),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter((expense) => {
      const spentAtDate = new Date(expense.spentAt);

      return spentAtDate >= fromDate && spentAtDate <= toDate;
    });
  }

  return filteredExpenses;
};

module.exports = { getFilteredExpenses };
