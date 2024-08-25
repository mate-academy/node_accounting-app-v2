let expenses = [];

function clearExpenses() {
  expenses = [];
}

function getExpenses(userId, categories, from, to) {
  return expenses.filter((expense) => {
    const userMatch = userId === undefined || expense.userId === +userId;

    const categoryMatch =
      !categories ||
      categories.length === 0 ||
      categories.includes(expense.category);

    let dateMatch = true;

    if (from && to) {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      dateMatch = expenseDate >= fromDate && expenseDate <= toDate;
    }

    return userMatch && categoryMatch && dateMatch;
  });
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
  const newExpenses = expenses.filter((expense) => expense.id !== +id);

  expenses = newExpenses;
}

function updateExpense(id, fields) {
  const expense = getExpense(id);

  Object.assign(expense, fields);

  return expense;
}

module.exports = {
  clearExpenses,
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
