let expenses = [];
let expenseId = 1;

function resetExpenses() {
  expenses = [];
  expenseId = 1;
}

function getExpenses() {
  return expenses;
}

function createExpense(data) {
  const expense = {
    id: expenseId++,
    ...data,
  };

  expenses.push(expense);

  return expense;
}

function getExpenseById(id) {
  const expense = expenses.find((exp) => exp.id === id);

  return expense || null;
}

function deleteExpenseById(id) {
  const index = expenses.findIndex((exp) => exp.id === id);

  if (index !== -1) {
    return expenses.splice(index, 1)[0];
  }

  return null;
}

function updateExpenseById(id, data) {
  const expense = expenses.find((exp) => exp.id === id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, data);

  return expense;
}

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
  resetExpenses,
};
