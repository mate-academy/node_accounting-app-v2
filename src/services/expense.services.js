let expenses = [];
let nextId = 1;

const resetExpenses = () => {
  expenses = [];
  nextId = 1;
};

const getExpenses = ({ userId, categoryList, from, to }) => {
  return expenses.filter((expense) => {
    let match = true;

    if (userId && expense.userId !== +userId) {
      match = false;
    }

    if (from && new Date(expense.spentAt) < new Date(from)) {
      match = false;
    }

    if (to && new Date(expense.spentAt) > new Date(to)) {
      match = false;
    }

    if (categoryList.length > 0 && !categoryList.includes(expense.category)) {
      match = false;
    }

    return match;
  });
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: nextId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);
  nextId++;

  return expense;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const deleteExpenseById = (id) => {
  const index = expenses.findIndex((expense) => expense.id === +id);

  if (index === -1) {
    return;
  }

  const [deletedExpense] = expenses.splice(index, 1);

  return deletedExpense;
};

const updateExpenseById = ({ id, data }) => {
  const foundExpense = expenses.find((expense) => expense.id === +id);

  if (!foundExpense) {
    return;
  }

  return Object.assign(foundExpense, data);
};

const expensesService = {
  getExpenses,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
};

module.exports = {
  expensesService,
  resetExpenses,
};
