let expenses = [];
let nextExpenseId = 1;

const getAllExpenses = (userId, from, to, categories) => {
  return expenses.filter((el) => {
    return (
      (!userId || el.userId === +userId) &&
      (!from || new Date(el.spentAt) >= new Date(from)) &&
      (!to || new Date(el.spentAt) <= new Date(to)) &&
      (!categories || categories === el.category)
    );
  });
};

const addExpense = (expenseParams) => {
  const expense = {
    ...expenseParams,
    id: nextExpenseId++,
  };

  expenses.push(expense);

  return expense;
};
const getById = (expenseId) => expenses.find((el) => el.id === +expenseId);

const deleteExpense = (expenseId) => {
  expenses = expenses.filter((el) => el.id !== +expenseId);
};

const updateExpense = (id, expenseParams) => {
  const expense = getById(id);

  const paramsToUpdate = Object.fromEntries(
    Object.entries(expenseParams).filter((el) => el[1]),
  );

  Object.assign(expense, paramsToUpdate);

  return expense;
};

const clear = () => {
  expenses = [];
};

const expenseExists = (expenseId) =>
  expenses.map((el) => el.id).includes(+expenseId);

module.exports = {
  getAllExpenses,
  addExpense,
  getById,
  deleteExpense,
  updateExpense,
  clear,
  expenseExists,
};
