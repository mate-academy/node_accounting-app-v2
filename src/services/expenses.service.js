const generateRandomId = () => Math.floor(Math.random() * 1000000);

let expenses = [];

const getAllExpensesService = ({ userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filteredExpenses;
};

const createNewExpenseService = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const newExpense = {
    id: generateRandomId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getExpenseByIdService = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const deleteExpenseByIdService = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const updateExpenseByIdService = (id, title) => {
  const expense = getExpenseByIdService(id);

  Object.assign(expense, { title });

  return expense;
};

const expensesReset = () => (expenses = []);

module.exports = {
  getAllExpensesService,
  createNewExpenseService,
  getExpenseByIdService,
  deleteExpenseByIdService,
  updateExpenseByIdService,
  expensesReset,
};
