const expenses = [];
let expenseIdCounter = 1;

const createExpenseService = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const newExpense = {
    id: expenseIdCounter++,
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

const getExpensesService = (userId, categories, from, to) => {
  return expenses.filter((expense) => {
    return (
      (!userId || expense.userId === parseInt(userId)) &&
      (!categories ||
        (Array.isArray(categories) ? categories : [categories]).includes(
          expense.category,
        )) &&
      (!from || new Date(expense.spentAt) >= new Date(from)) &&
      (!to || new Date(expense.spentAt) <= new Date(to))
    );
  });
};

const getExpenseByIdService = (id) =>
  expenses.find((expense) => expense.id === parseInt(id));

const updateExpenseService = (id, spentAt, title, amount, category, note) => {
  // eslint-disable-next-line no-shadow
  const expense = expenses.find((expense) => expense.id === parseInt(id));

  if (!expense) {
    return null;
  }

  Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

const deleteExpenseService = (id) => {
  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === parseInt(id),
  );

  if (expenseIndex === -1) {
    return false;
  }
  expenses.splice(expenseIndex, 1);

  return true;
};

module.exports = {
  createExpenseService,
  getExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
};
