let expenseIdCounter = 1;
let expenses = [];

const setInitExpanses = () => {
  expenses = [];
};

const getAll = (userId, from, to, categories) => {
  let preparedExpenses = [...expenses];

  if (userId) {
    preparedExpenses = preparedExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (from) {
    preparedExpenses = preparedExpenses.filter(
      (expense) => expense.spentAt > from,
    );
  }

  if (to) {
    preparedExpenses = preparedExpenses.filter(
      (expense) => expense.spentAt < to,
    );
  }

  if (categories) {
    preparedExpenses = preparedExpenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  }

  return preparedExpenses;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: expenseIdCounter++,
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

const getById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const update = ({ id, spentAt, title, amount, category, note }) => {
  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    return;
  }

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    return (expense.amount = amount);
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  return expense;
};

const deleteById = (id) => {
  const index = expenses.findIndex((i) => i.id === +id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
  setInitExpanses,
};
