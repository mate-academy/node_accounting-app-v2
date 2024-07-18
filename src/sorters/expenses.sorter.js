function sortByUserId(userId, currentExpenses) {
  if (userId) {
    return currentExpenses.filter((exp) => exp.userId === +userId);
  }

  return currentExpenses;
}

function sortByCategory(category, currentExpenses) {
  if (category) {
    return currentExpenses.filter((exp) => exp.category === category);
  }

  return currentExpenses;
}

function sortByFrom(from, currentExpenses) {
  if (from) {
    currentExpenses.filter((exp) => Date(exp.spentAt) >= Date(from));
  }

  return currentExpenses;
}

function sortByTo(to, currentExpenses) {
  if (to) {
    currentExpenses.filter((exp) => Date(exp.spentAt) <= Date(to));
  }

  return currentExpenses;
}

module.exports = {
  sortByCategory,
  sortByFrom,
  sortByTo,
  sortByUserId,
};
