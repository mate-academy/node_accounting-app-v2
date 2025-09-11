let expenses = [];
let nextId = 1;

const getAll = ({ userId, from, to, categories }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === parseInt(userId),
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
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

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === parseInt(id)) || null;
};

const add = (expense) => {
  const id = nextId++;
  const createdExpense = { ...expense, id };

  expenses.push(createdExpense);

  return createdExpense;
};

const remove = (id) => {
  const existing = getById(id);

  if (!existing) {
    return;
  }
  expenses = expenses.filter((expense) => expense.id !== parseInt(id));
};

const update = (newExpense) => {
  const expense = getById(newExpense.id);

  if (!expense) {
    return;
  }

  Object.assign(expense, newExpense);

  return expense;
};

const clear = () => {
  expenses = [];
  nextId = 1;
};

const expensesService = {
  getAll,
  getById,
  add,
  remove,
  update,
  clear,
};

module.exports = {
  expensesService,
};
