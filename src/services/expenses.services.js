let expenses = [];

const initExpenses = () => (expenses = []);

const getAllExpenses = (userId, categories, from, to) => {
  let filteredExpences = expenses;

  if (userId) {
    filteredExpences = filteredExpences.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (categories) {
    filteredExpences = filteredExpences.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpences = filteredExpences.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpences = filteredExpences.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filteredExpences;
};

const getExpensesById = (id) => {
  return expenses.find((expense) => expense.id === Number(id));
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const lastId = expenses.length ? expenses[expenses.length - 1].id : 0;
  const newExpense = {
    id: lastId + 1,
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category,
    note: note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (id, data) => {
  const updExpense = getExpensesById(id);

  Object.assign(updExpense, data);

  return getExpensesById(id);
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

module.exports = {
  initExpenses,
  getAllExpenses,
  getExpensesById,
  createExpense,
  updateExpense,
  deleteExpense,
};
