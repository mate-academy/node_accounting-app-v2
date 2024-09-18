const expenses = [];
let currentId = 0;

const reset = () => {
  expenses.length = 0;
  currentId = 0;
};

const getAll = ({ userId, from, to, categories }) => {
  const filteredExpenses = expenses.filter((expense) => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (from && new Date(expense.spentAt) < new Date(from)) {
      return false;
    }

    if (to && new Date(expense.spentAt) > new Date(to)) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

const getById = (id) => {
  const numId = +id;

  if (isNaN(numId)) {
    return;
  }

  return expenses.find((expense) => expense.id === numId);
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  currentId += 1;

  const newExpense = {
    id: currentId,
    spentAt,
    userId,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteById = (id) => {
  const numId = +id;

  if (isNaN(numId)) {
    return;
  }

  const expenseIndex = expenses.findIndex((e) => e.id === numId);

  if (expenseIndex === -1) {
    return;
  }

  const [expense] = expenses.splice(expenseIndex, 1);

  return expense;
};

const updateById = (id, { spentAt, title, amount, category, note }) => {
  const numId = +id;

  if (isNaN(numId)) {
    return;
  }

  const expense = expenses.find((e) => e.id === numId);

  if (!expense) {
    return;
  }

  return Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
  reset,
};
