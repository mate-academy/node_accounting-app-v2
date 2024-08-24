let expenses = [];

function getExpenses(userId, categories, from, to) {
  const result = expenses.filter(
    (expense) =>
      expense.userId === userId &&
      categories.includes(expense.category) &&
      from <= expense.spentAt <= to,
  );

  return result;
}

function createExpense(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: expenses.length,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function getExpense(id) {
  return expenses[id];
}

function removeExpense(id) {
  const newExpenses = expenses.filter((expense) => expense.id !== id);

  expenses = newExpenses;
}

function updateExpense(id, spentAt, title, amount, category, note) {
  const expense = getExpense(id);

  Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
}

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
