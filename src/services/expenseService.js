let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = ({ userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter((exp) => exp.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (exp) => exp.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (exp) => new Date(exp.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (exp) => new Date(exp.spentAt) <= new Date(to),
    );
  }

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find((exp) => exp.id === +id) ?? null;
};

const create = (data) => {
  const newExpense = {
    id: expenses[expenses.length - 1]?.id + 1 || 1,
    ...data,
    note: data?.note ?? '',
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateById = (id, data) => {
  const expense = getById(id);

  Object.assign(expense, data);

  return expense;
};

const removeById = (id) => {
  expenses = expenses.filter((exp) => exp.id !== +id);
};

module.exports = {
  getAll,
  create,
  getById,
  removeById,
  updateById,
  reset,
};
