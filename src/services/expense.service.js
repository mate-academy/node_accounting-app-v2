let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

let nextId = 1;

const getAllExp = (userId, categories, from, to) => {
  let expList = expenses;

  if (userId) {
    expList = expList.filter((exp) => exp.userId === +userId);
  }

  if (categories) {
    expList = expList.filter((exp) => categories.includes(exp.category));
  }

  if (from && to) {
    expList = expList.filter((exp) => exp.spentAt >= from && exp.spentAt <= to);
  }

  if (to) {
    expList = expList.filter((exp) => exp.spentAt <= to);
  }

  if (from) {
    expList = expList.filter((exp) => exp.spentAt >= from);
  }

  return expList;
};

const getExpById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const createExp = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: nextId++,
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

const updateExp = (id, { spentAt, title, amount, category, note }) => {
  const expense = getExpById(id);

  Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

const removeExp = (id) => {
  expenses = expenses.filter((exp) => exp.id !== +id);
};

module.exports = {
  resetExpenses,
  getAllExp,
  getExpById,
  createExp,
  updateExp,
  removeExp,
};
