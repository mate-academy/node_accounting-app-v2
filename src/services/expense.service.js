let expenses = [];

const create = (data) => {
  const newExpense = {
    id: expenses[expenses.length - 1]?.id + 1 || 1,
    ...data,
    note: data?.note ?? '',
  };

  expenses.push(newExpense);

  return newExpense;
};

const getAll = ({ userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return new Date(expense.spentAt) >= new Date(from);
    });
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      return new Date(expense.spentAt) <= new Date(to);
    });
  }

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === +id) ?? null;
};

const update = (id, data) => {
  const expense = getById(id);

  Object.assign(expense, data);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const reset = () => {
  expenses = [];
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  reset,
};
