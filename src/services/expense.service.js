let expenses, nextId;

const init = () => {
  expenses = [];
  nextId = 0;
};

const get = (query) => {
  let { userId } = query;
  const { categories, from, to } = query;
  let filteredExpenses = [...expenses];

  if (userId !== undefined) {
    userId = Number(userId);

    if (!isNaN(userId)) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => exp.userId === userId,
      );
    }
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (exp) => exp.category === categories,
    );
  }

  if (from) {
    const date2 = new Date(from).getTime();

    filteredExpenses = filteredExpenses.filter((exp) => {
      const date1 = new Date(exp.spentAt).getTime();

      return date1 > date2;
    });
  }

  if (to) {
    const date2 = new Date(to).getTime();

    filteredExpenses = filteredExpenses.filter((exp) => {
      const date1 = new Date(exp.spentAt).getTime();

      return date1 < date2;
    });
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.id === id) || null;
};

const createExpense = (expense) => {
  const newExpense = Object.assign({ id: nextId }, expense);

  nextId++;

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (id) => {
  const newExpenses = expenses.filter((expense) => expense.id !== id);

  expenses = newExpenses;
};

const updateExpense = (id, updatedBody) => {
  const expense = getExpenseById(id);

  Object.assign(expense, { ...updatedBody });

  return expense;
};

module.exports = {
  init,
  get,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
