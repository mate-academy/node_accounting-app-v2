function getExpensesByPeriod(expense, from, to) {
  const spentAt = new Date(expense.spentAt);
  const start = new Date(from);
  const end = to ? new Date(to) : new Date();

  return spentAt >= start && spentAt <= end;
}

module.exports = getExpensesByPeriod;
