const filterExpenses = (expenses, { userId, categories, from, to }) => {
  let preparedExpenses = expenses;

  if (userId) {
    preparedExpenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories.length > 0) {
    preparedExpenses = expenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  }

  if (from) {
    preparedExpenses = expenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    preparedExpenses = expenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return preparedExpenses;
};

module.exports = {
  filterExpenses,
};
