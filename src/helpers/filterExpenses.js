const filterExpenses = (expensesArray, params) => {
  const { userId, from, to, categories } = params;
  const filterCallbacks = [];

  if (userId) {
    filterCallbacks.push((exp) => exp.userId === +userId);
  }

  if (from) {
    filterCallbacks.push((exp) => exp.spentAt >= from);
  }

  if (to) {
    filterCallbacks.push((exp) => exp.spentAt <= to);
  }

  if (categories?.length) {
    filterCallbacks.push((exp) => categories.includes(exp.category));
  }

  return expensesArray.filter((exp) => {
    if (!filterCallbacks.length) {
      return true;
    }

    let includeExpense = true;

    for (let i = 0; i < filterCallbacks.length; i += 1) {
      if (!filterCallbacks[i](exp)) {
        includeExpense = false;
        break;
      }
    }

    return includeExpense;
  });
};

module.exports = {
  filterExpenses,
};
