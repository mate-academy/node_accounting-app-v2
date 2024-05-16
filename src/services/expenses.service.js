function createId() {
  return Math.round(Math.random() * 1000);
}

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getAll = (userId, categories, from, to) => {
  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((expense) => expense.category === categories);
  }

  if (from || to) {
    expenses = expenses.filter((expense) => {
      if (from && to) {
        return expense.spentAt >= from && expense.spentAt <= to;
      } else if (from) {
        return expense.spentAt >= from;
      } else {
        return expense.spentAt <= to;
      }
    });
  }

  return expenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: createId(),
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

const update = (id, { spentAt, title, amount, category, note }) => {
  const expense = getById(id);

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  resetExpenses,
};
