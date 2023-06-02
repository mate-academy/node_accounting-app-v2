'use strict';

const filterExpanses = (expense, queryParams) => {
  const { userId, categories, from, to } = queryParams;

  return (
    (!userId || expense.userId === Number(userId))
    && (!categories || categories.includes(expense.category))
    && (!from || expense.spentAt >= from)
    && (!to || expense.spentAt <= to)
  );
};

module.exports = {
  filterExpanses,
};
