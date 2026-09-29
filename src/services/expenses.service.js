const expenses = [];

function clearExpenses() {
  expenses.length = 0;
}

function getAllExpenses() {
  return expenses;
}

function getExpensesByUser(userId) {
  return expenses.filter((expense) => expense.userId === userId);
}

function getExpensesBetweenDates(from, to) {
  return expenses.filter(
    (expense) => expense.spentAt >= from && expense.spentAt <= to,
  );
}

function getExpenseByCategories(categories) {
  return expenses.filter((expense) => categories.includes(expense.category));
}

function getExpenseById(id) {
  return expenses.find((expense) => expense.id === id);
}

function createExpense(newExpense) {
  expenses.push(newExpense);

  return newExpense;
}

function deleteExpense(id) {
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);

  if (expenseIndex === -1) {
    return;
  }

  return expenses.splice(expenseIndex, 1);
}

function updateExpense(updatedExpense) {
  const expense = getExpenseById(updatedExpense.id);

  if (!expense) {
    return null;
  }

  return Object.assign(expense, updatedExpense);
}

module.exports = {
  clearExpenses,
  getAllExpenses,
  getExpensesByUser,
  getExpensesBetweenDates,
  getExpenseByCategories,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
