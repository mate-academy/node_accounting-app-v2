let expenses = [];

const getAll = () => {
  return expenses;
};

const getOne = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const create = (expensesData) => {
  const { userId, spentAt, title, amount, category, note } = expensesData;

  const newExpense = {
    id: Math.trunc(Date.now() + Math.random()),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  const index = expenses.findIndex((expense) => expense.id === id);

  expenses.splice(index, 1);
};

const update = (id, updatedData) => {
  const expense = expensesService.getOne(id);

  Object.assign(expense, updatedData);

  return expense;
};

const clear = () => {
  expenses = [];
};

const expensesService = {
  getAll,
  getOne,
  create,
  remove,
  update,
  clear,
};

module.exports = { expensesService };
