let expenses = [];
let count = 0;

function getAllExpenses({ userId, from, to, categories }) {
  let result = expenses;

  if (userId) {
    result = result.filter((item) => item.userId === Number(userId));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    result = result.filter((item) => {
      const spentDate = new Date(item.spentAt);

      return spentDate >= fromDate && spentDate <= toDate;
    });
  }

  if (categories) {
    const cats = categories.split(',');

    result = result.filter((item) => cats.includes(item.category));
  }

  return result;
}

function createExpense(data) {
  const newExpense = {
    id: ++count,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function getExpenseById(id) {
  return expenses.find((item) => item.id === Number(id));
}

function deleteExpense(id) {
  const expense = getExpenseById(id);

  if (!expense) {
    return false;
  }

  expenses = expenses.filter((item) => item.id !== expense.id);

  return true;
}

function updateExpense(id, updates) {
  const expense = getExpenseById(id);

  if (!expense) {
    return null;
  }

  for (const key in updates) {
    if (updates[key] !== undefined) {
      expense[key] = updates[key];
    }
  }

  return expense;
}

function reset() {
  expenses = [];
  count = 0;
}

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
  reset,
};
