let expenses = [];
let expenseId = 1;

const resetExpenses = () => {
  expenses = [];
};

const getAllExpense = () => {
  return expenses;
};

const getExpensesById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: expenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenseId++;
  expenses.push(expense);

  return expense;
};

const updateExpense = (id, data) => {
  const expense = getExpensesById(id);

  Object.assign(expense, data);

  return expense;
};

const removeExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

module.exports = {
  getAllExpense,
  getExpensesById,
  createExpense,
  updateExpense,
  removeExpense,
  resetExpenses,
};
