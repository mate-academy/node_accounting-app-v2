const getPreparedExpenses = (query, expenses) => {
  const { userId, categories, from, to } = query;
  let preparedExpenses = [...expenses];

  if (userId) {
    preparedExpenses = expenses.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (categories) {
    preparedExpenses = expenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from && to) {
    const startDate = new Date(from);
    const endDate = new Date(to);

    preparedExpenses = expenses.filter((expense) => {
      const currentDate = new Date(expense.spentAt);

      return currentDate >= startDate && currentDate <= endDate;
    });
  }

  return preparedExpenses;
};

const getFilteredItems = (id, items) => {
  return items.filter((item) => item.id !== Number(id));
};

const getItemById = (id, items) => {
  return items.find((item) => item.id === Number(id)) || null;
};

const getNewId = (items) => {
  return Math.max(items.map((item) => item.id)) + 1 || 1;
};

module.exports = {
  getPreparedExpenses,
  getFilteredItems,
  getItemById,
  getNewId,
};
