const getId = () => {
  return Math.floor(Math.random() * 1000);
};

const expenses = [
  {
    id: 1,
    userId: 1,
    spentAt: 55,
    title: 'kij',
    amount: 66,
    category: 'kk',
    note: 'jh',
  },
];

const resetExpenses = () => {
  expenses.splice(0, expenses.length);
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses.filter((expense) => expense.userId === userId);
  }

  if (categories) {
    filteredExpenses = expenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from && to) {
    return expenses.filter(
      (expense) => expense.spentAt >= from && expense.spentAt <= to,
    );
  }

  if (to) {
    return expenses.filter((expense) => expense.spentAt <= to);
  }

  if (from) {
    return expenses.filter((expense) => expense.spentAt >= from);
  }

  return filteredExpenses;
};

const getOneExpense = (id) => {
  const selectedExpense = expenses.find((expense) => expense.id === id);

  return selectedExpense;
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id: getId(),
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

const removeExpense = (id) => {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);

  return true;
};

const updateExpense = (
  id,
  { userId, spentAt, title, amount, category, note },
) => {
  const selectedExpense = getOneExpense(+id);

  Object.assign(selectedExpense, {
    ...(userId && { userId }),
    ...(spentAt && { spentAt }),
    ...(title && { title }),
    ...(amount && { amount }),
    ...(category && { category }),
    ...(note && { note }),
  });

  return selectedExpense;
};

module.exports = {
  resetExpenses,
  updateExpense,
  removeExpense,
  createExpense,
  getExpenses,
  getOneExpense,
};
