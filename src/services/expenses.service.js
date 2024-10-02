const { data } = require('../data/data');

const getAll = (queries) => {
  const { userId, categories, from, to } = queries;
  let expenses = [...data.expenses];

  if (userId) {
    expenses = expenses.filter((e) => e.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(
      (e) => e.category.toLowerCase() === categories.toLowerCase(),
    );
  }

  if (from) {
    expenses = expenses.filter(({ spentAt }) => {
      const expenseDate = new Date(spentAt);
      const fromDate = new Date(from);

      return expenseDate > fromDate;
    });
  }

  if (to) {
    expenses = expenses.filter(({ spentAt }) => {
      const expenseDate = new Date(spentAt);
      const toDate = new Date(to);

      return expenseDate < toDate;
    });
  }

  return expenses;
};

const create = (dataToCreate) => {
  const expense = {
    id: +Date.now(),
    ...dataToCreate,
  };

  data.expenses.push(expense);

  return expense;
};

const getById = (id) => {
  const expense = data.expenses.find((e) => e.id === id);

  return expense;
};

const deleteById = (id) => {
  const index = data.expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = data.expenses.splice(index, 1);

  return expense;
};

const update = (dataToUpdate) => {
  const expense = getById(dataToUpdate.id);

  if (!expense) {
    return;
  }

  const { id, ...keysToUpdate } = dataToUpdate;

  return Object.assign(expense, keysToUpdate);
};

const expensesService = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};

module.exports = {
  expensesService,
};
