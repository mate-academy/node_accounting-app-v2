let expenses = [];
let nextExpenseId = 1;

const getAllExpenseService = ({ userId, from, to, categories }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter((expense) => {
      const spentAtDate = new Date(expense.spentAt);

      return spentAtDate >= fromDate && spentAtDate <= toDate;
    });
  }

  if (categories) {
    const categoryList = categories.split(',');

    filteredExpenses = filteredExpenses.filter((expense) =>
      // eslint-disable-next-line
      categoryList.includes(expense.category)
    );
  }

  return filteredExpenses;
};

const getExpenseByIdService = (id) => {
  return expenses.find((item) => item.id === +id);
};

const createExpenseService = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  if (!userId || !spentAt || !title || !amount || !category) {
    throw new Error('Invalid input data');
  }

  const newExpense = {
    id: nextExpenseId++,
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

const updateExpenseService = (id, title) => {
  const expense = getExpenseByIdService(id);

  Object.assign(expense, { title });

  if (!expense) {
    throw new Error('Expense not found');
  }

  if (title) {
    expense.title = title;
  }

  return expense;
};

const deleteExpenseService = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const expensesReset = () => {
  expenses = [];
};

module.exports = {
  getAllExpenseService,
  getExpenseByIdService,
  createExpenseService,
  updateExpenseService,
  deleteExpenseService,
  expensesReset,
};
