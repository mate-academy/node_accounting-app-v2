let expenses = [];

function resetAllExpenses() {
  expenses = [];
}

function getAllExpenses() {
  return expenses;
}

function getExpenseById(id) {
  return expenses.find((item) => item.id === +id);
}

function addExpense(expense) {
  const { userId, spentAt, title, amount, category, note } = expense;

  const newExpense = {
    id: Math.round(Math.random() * 200),
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

function deleteExpense(id) {
  const deleteStatus = expenses.find((item) => item.id === +id);

  if (deleteStatus !== undefined) {
    expenses = expenses.filter((item) => item.id !== +id);
  }

  return deleteStatus;
}

function updateExpense(id, expense) {
  const expenseToUpdate = expenses.find((item) => item.id === +id);

  if (expenseToUpdate !== undefined) {
    expenseToUpdate.userId = expense.userId || expenseToUpdate.userId;
    expenseToUpdate.spentAt = expense.spentAt || expenseToUpdate.spentAt;
    expenseToUpdate.title = expense.title || expenseToUpdate.title;
    expenseToUpdate.amount = expense.amount || expenseToUpdate.amount;
    expenseToUpdate.category = expense.category || expenseToUpdate.category;
    expenseToUpdate.note = expense.note || expenseToUpdate.note;
  }

  return expenseToUpdate;
}

function getExpenseByCategory(userId, categories, from, to) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.userId === +userId,
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter((item) => {
      const date = new Date(item.spentAt);

      if (date >= new Date(from) && date <= new Date(to)) {
        return true;
      }
    });
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((item) => {
      if (
        (Array.isArray(categories) && categories.includes(item.category)) ||
        categories === item.category
      ) {
        return true;
      }
    });
  }

  return filteredExpenses;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
  getExpenseByCategory,
  resetAllExpenses,
};
