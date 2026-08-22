const expenses = [];

const getAllExpenses = (params) => {
  return expenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const createExpense = (name) => {
  const maxId =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.id))
      : 0;
  const newId = maxId + 1;

  const newExpense = {
    id: newId,
    name: name,
  };

  expenses.push(newExpense);

  return expenses;
};

const changeExpense = (id, newName) => {
  const findExpenses = expenses.find((expense) => expense.id === id);

  Object.assign(findExpenses, { newName });

  return findExpenses;
};

const deleteExpense = (id) => {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return;
  }

  const [deletedExpenses] = expenses.splice(index, 1);

  return deletedExpenses;
};

const expensesService = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  changeExpense,
  deleteExpense,
};

module.exports = {
  expensesService,
};
