let expenses = [];
let currentId = 1;

const getAll = ({ userId, categories, from, to }) => {
  let preparedExpenses = expenses;

  if (userId) {
    preparedExpenses = preparedExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    preparedExpenses = preparedExpenses.filter(
      (expense) => categories === expense.category,
    );
  }

  if (from) {
    preparedExpenses = preparedExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    preparedExpenses = preparedExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return preparedExpenses;
};

const getById = (id) => {
  return expenses.find((user) => user.id === id);
};

const create = (data) => {
  const newExpense = {
    id: currentId++,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const update = (id, data) => {
  const expense = getById(+id);

  Object.assign(expense, data);

  return expense;
};

const clearAll = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clearAll,
};
