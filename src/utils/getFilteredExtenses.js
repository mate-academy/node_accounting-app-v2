const filterExpenses = (allExpenses, { userId, categories, from, to }) => {
  return allExpenses.filter((item) => {
    const matchesUserId = userId ? item.userId === Number(userId) : true;
    const matchesCategory = categories ? item.category === categories : true;
    const matchesFrom = from ? new Date(item.spentAt) >= new Date(from) : true;
    const matchesTo = to ? new Date(item.spentAt) <= new Date(to) : true;

    return matchesUserId && matchesCategory && matchesFrom && matchesTo;
  });
};

module.exports = {
  filterExpenses,
};
