let expenses = [];

const initExpenses = () => {
  expenses = [];
};

const idGenerator = () => {
  if (!expenses.length) {
    return 1;
  }

  const expensesIds = expenses.map((user) => user.id);

  return Math.max(...expensesIds) + 1;
};

const createExpenseService = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const newExpense = {
    id: idGenerator(),
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
  let preparedExpenses = expenses;

  if (userId) {
    preparedExpenses = preparedExpenses.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (from || to) {
    preparedExpenses = preparedExpenses.filter((expense) => {
      const date = expense.spentAt;

      if (date >= from && date <= to) {
        return expense;
      }
    });
  }

  if (categories) {
    preparedExpenses = preparedExpenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  }

  return preparedExpenses;
};

const getExpenseByIdService = (id) =>
  expenses.find((expense) => expense.id === parseInt(id));

const updateExpenseService = (id, spentAt, title, amount, category, note) => {
  // eslint-disable-next-line no-shadow
  const expense = expenses.find((expense) => expense.id === Number(id));

  if (!expense) {
    return null;
  }

  Object.assign(expense, {
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
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
  initExpenses,
};
