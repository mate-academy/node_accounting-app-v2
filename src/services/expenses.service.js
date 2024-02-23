let expenses = [];

const init = () => {
  expenses = [];
};

const getOne = (id) => {
  return expenses.find((item) => item.id === id) || null;
};

const getAll = () => expenses;

const remove = (id) => {
  expenses = expenses.filter((item) => item.id !== id);

  return expenses;
};

const create = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const spentProduct = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(spentProduct);

  return spentProduct;
};

const update = (id, args) => Object.assign(getOne(id), { ...args });

const filter = (id, categories, dateFrom, dateTo) => {
  const filteredExpenses = (getAll()).filter((item) => {
    if (!Number.isNaN(id) && item.userId !== id) {
      return false;
    }

    if (categories !== undefined && !categories.includes(item.category)) {
      return false;
    }

    if (dateFrom !== undefined && new Date(item.spentAt) < new Date(dateFrom)) {
      return false;
    }

    if (dateTo !== undefined && new Date(item.spentAt) > new Date(dateTo)) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

module.exports = {
  expenses,
  init,
  getOne,
  getAll,
  remove,
  create,
  update,
  filter,
};
