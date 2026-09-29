const expenses = [];

function clearExpenses() {
  expenses.length = 0;
}

function getAllExpenses() {
  return expenses;
}

function getExpensesByUser(expensesList, userId) {
  return expensesList.filter((expense) => expense.userId === userId);
}

function getExpensesBetweenDates(expensesList, from, to) {
  return expensesList.filter(
    (expense) => expense.spentAt >= from && expense.spentAt <= to,
  );
}

function getExpenseByCategories(expensesList, categories) {
  const categoriesArray = categories.split(',');

  return expensesList.filter((expense) => {
    return categoriesArray.includes(expense.category);
  });
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

  expenses.splice(expenseIndex, 1);
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
