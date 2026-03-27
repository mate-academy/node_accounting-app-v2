const getAll = (expenses, filters) => {
  let result = [...expenses];
  const { userId, categories, from, to } = filters;

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    result = result.filter((e) => e.category === categories);
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  return result;
};

const getById = (expenses, id) => {
  return expenses.find((expense) => expense.id === id);
};

const remove = (expenses, id) => {
  const index = expenses.findIndex((u) => u.id === id);

  if (index !== -1) {
    expenses.splice(index, 1);

    return true;
  }

  return false;
};

module.exports = {
  getAll,
  getById,
  remove,
};
