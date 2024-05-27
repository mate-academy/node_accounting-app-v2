let expenses = [];

const getAll = ({ userId, categories, from, to }) => {
  return expenses.filter(
    (expense) =>
      (!userId || expense.userId === Number(userId)) &&
      (!categories || expense.category === categories) &&
      (!from || new Date(expense.spentAt) >= new Date(from)) &&
      (!to || new Date(expense.spentAt) <= new Date(to)),
  );
};

const getById = (userID) => {
  return expenses.find((expense) => expense.id === Number(userID)) || null;
};

const create = (data) => {
  const expense = {
    id: expenses.length,
    ...data,
    note: data?.note || '',
  };

  expenses.push(expense);

  return expense;
};

const remove = (userID) => {
  expenses = expenses.filter((expense) => expense.id !== Number(userID));
};

const reset = () => {
  expenses = [];
};

const update = (id, data) => {
  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === Number(id),
  );

  expenses[expenseIndex] = { ...expenses[expenseIndex], ...data };

  return expenses[expenseIndex];
};

module.exports = {
  getAll,
  getById,
  create,
  reset,
  remove,
  update,
};
