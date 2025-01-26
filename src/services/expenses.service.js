const expenses = [];

const getExpenses = (userId, categories, from, to) => {
  return expenses
    .filter((expense) => !userId || expense.userId === Number(userId))
    .filter((expense) => !categories || categories.includes(expense.category))
    .filter((expense) => !from || new Date(expense.spentAt) >= new Date(from))
    .filter((expense) => !to || new Date(expense.spentAt) <= new Date(to));
};

const getExpense = (expenseId) => {
  const expense = expenses.find((exp) => exp.id === expenseId);

  return expense;
};

const addExpense = (expense) => {
  const newExpense = {
    ...expense,
    id: expenses.length + 1,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (expenseId, newTitle) => {
  const expense = expenses.find((exp) => exp.id === Number(expenseId));

  if (!expense) {
    return;
  }

  expense.title = newTitle;

  return expense;
};

const removeExpense = (index) => {
  expenses.splice(index, 1);
};

const resetExpenses = () => {
  expenses.length = 0;
};

module.exports = {
  resetExpenses,
  getExpenses,
  getExpense,
  addExpense,
  updateExpense,
  removeExpense,
};
