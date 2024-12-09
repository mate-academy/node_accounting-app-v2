let expenses = [];
let expenseIdCounter = 1;

const resetExpenses = () => {
  expenses = [];
};

const getAllExpenses = (userId, categories, from, to) => {
  return expenses
    .filter((expense) => !userId || expense.userId === +userId)
    .filter((expense) => !categories || expense.category === categories)
    .filter((expense) => !from || new Date(expense.spentAt) >= new Date(from))
    .filter((expense) => !to || new Date(expense.spentAt) <= new Date(to));
};

const getExpensesById = (id) => {
  return expenses.find((exp) => exp.id === Number(id));
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: expenseIdCounter++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((exp) => exp.id !== Number(id));
};

const updateExpense = (id, title) => {
  const expense = getExpensesById(id);

  Object.assign(expense, { title });

  return expense;
};

module.exports = {
  resetExpenses,
  getAllExpenses,
  getExpensesById,
  createExpense,
  deleteExpense,
  updateExpense,
};
