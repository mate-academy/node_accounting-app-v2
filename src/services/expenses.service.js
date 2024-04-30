function getRandomNumber() {
  const min = 0;
  const max = 100;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let expenses = [];

const start = () => {
  expenses = [];
};

const getAll = (userId, categories, from, to) => {
  if (userId) {
    const filteredByUser = expenses.filter((e) => e.userId === +userId);

    if (categories) {
      const filteredByCategories = filteredByUser.filter(
        (e) => e.category === categories,
      );

      return filteredByCategories;
    }

    return filteredByUser;
  }

  if (from || to) {
    const filterByDates = expenses.filter(
      (e) => e.spentAt >= from && e.spentAt <= to,
    );

    return filterByDates;
  }

  return expenses;
};

const getById = (id) => {
  return expenses.find((item) => item.id === +id);
};

const create = (userId, spentAt, title, amount, category, note) => {
  const item = {
    id: getRandomNumber(),
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category,
    note: note,
  };

  expenses.push(item);

  return item;
};

const remove = (id) => {
  expenses = expenses.filter((item) => item.id !== +id);
};

const change = (id, title) => {
  const item = getById(id);

  item.title = title;

  return item;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  remove,
  change,
};
