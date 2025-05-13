const expenses = [];

function getAll() {
  return expenses;
}

function getByCategory(cat) {
  const filteredExpenses = expenses.filter((item) => item.category === cat);

  return filteredExpenses;
}

function getById(id) {
  return expenses.find((item) => item.id === +id) || null;
}

function getByUserId(userId) {
  return expenses.filter((item) => item.userId === +userId);
}

function createExpense(expense) {
  const newExpense = { ...expense, id: expenses.length + 1 };

  expenses.push(newExpense);

  return newExpense;
}

function deleteById(id) {
  const index = expenses.findIndex((item) => item.id === +id);

  if (index === -1) {
    return;
  }

  const [deletedExpense] = expenses.splice(index, 1);

  return deletedExpense;
}

function update({ id, body }) {
  const expense = expenses.find((item) => item.id === +id);

  return Object.assign(expense, body);
}

function resetExpenses() {
  expenses.length = 0;
}

const expensesService = {
  getAll,
  getByCategory,
  getById,
  getByUserId,
  createExpense,
  deleteById,
  update,
  resetExpenses,
};

module.exports = {
  expensesService,
};
