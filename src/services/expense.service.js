const expenses = [];

function resetExpenses() {
  expenses.length = 0;
}

function getId() {
  const MaxId = expenses.length ? Math.max(...expenses.map((e) => e.id)) : 0;

  return MaxId + 1;
}

function getAllExpenses() {
  return expenses;
}

function getExpenseById(expenseId) {
  return expenses.find((e) => e.id === expenseId);
}

function getExpenseByFilter(filterExpenses) {
  let filteredExpenses = [...expenses];

  if (filterExpenses.expenseId) {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.id === filterExpenses.expenseId,
    );
  }

  if (filterExpenses.userId) {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.userId === filterExpenses.userId,
    );
  }

  if (filterExpenses.categoryName) {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.category === filterExpenses.categoryName,
    );
  }

  if (filterExpenses.dateFrom && filterExpenses.dateTo) {
    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) >= new Date(filterExpenses.dateFrom),
    );

    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) <= new Date(filterExpenses.dateTo),
    );
  }

  return filteredExpenses;
}

function createExpense(expenseData) {
  const expense = {
    id: getId(),
    userId: expenseData.userId,
    spentAt: expenseData.spentAt,
    title: expenseData.title,
    amount: expenseData.amount,
    category: expenseData.category,
    note: expenseData.note,
  };

  expenses.push(expense);

  return expense;
}

function updateExpense(expenseData) {
  const findExpense = expenses.find((e) => e.id === expenseData.id);

  if (!findExpense) {
    return;
  }

  return Object.assign(findExpense, {
    spentAt: expenseData.spentAt ?? findExpense.spentAt,
    title: expenseData.title ?? findExpense.title,
    amount: expenseData.amount ?? findExpense.amount,
    category: expenseData.category ?? findExpense.category,
    note: expenseData.note ?? findExpense.note,
  });
}

function deleteExpense(id) {
  const findExpenseIndex = expenses.findIndex((e) => e.id === id);

  if (findExpenseIndex === -1) {
    return;
  }

  const [deletedExpense] = expenses.splice(findExpenseIndex, 1);

  return deletedExpense;
}

const expenseService = {
  resetExpenses,
  getAllExpenses,
  getExpenseById,
  getExpenseByFilter,
  createExpense,
  updateExpense,
  deleteExpense,
};

module.exports = expenseService;
