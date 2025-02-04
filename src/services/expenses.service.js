const expenses = [];
const generateId = (arr) => arr.length + 1;

const getAll = () => expenses;

const resetExpenses = () => (expenses.length = 0);

const remove = (index) => expenses.splice(index, 1);

const indexOfExpense = (id) =>
  expenses.findIndex((expense) => expense.id === +id);

const update = (index, data) => {
  const expense = expenses[index];

  const updatedFields = Object.keys(data).reduce((acc, key) => {
    acc[key] = data[key];

    return acc;
  }, {});

  expenses[index] = { ...expense, ...updatedFields };

  return expenses[index];
};

const create = (data) => {
  const newExpense = { ...data, id: generateId(expenses) };

  expenses.push(newExpense);

  return newExpense;
};

const filterByQuery = (category, from, to, userId) => {
  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;

  return expenses.filter((expense) => {
    const matchesCategory = category ? expense.category === category : true;
    const matchesDate =
      fromDate && toDate
        ? new Date(expense.spentAt) >= fromDate &&
          new Date(expense.spentAt) <= toDate
        : true;
    const matchesUser = userId ? expense.userId === +userId : true;

    return matchesCategory && matchesDate && matchesUser;
  });
};

const getById = (id) => expenses.find((expense) => expense.id === +id) || null;

module.exports = {
  getAll,
  getById,
  create,
  indexOfExpense,
  remove,
  update,
  resetExpenses,
  filterByQuery,
};
