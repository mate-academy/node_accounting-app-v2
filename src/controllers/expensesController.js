const Expense = require('./Expense');
const { mockExpenses } = require('./data');

const getExpenses = () => [...mockExpenses.values()];

const getExpenseById = (id) => mockExpenses.get(id);

const addExpense = (userId, spentAt, title, amount, category, note) => {
  const maxId = Math.max(...mockExpenses.keys(), 0);
  const newId = maxId + 1;

  const newExpense = new Expense(
    newId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  mockExpenses.set(newId, newExpense);

  return newExpense;
};

const deleteExpenseById = (id) => {
  const deletedExpense = mockExpenses.get(id);

  mockExpenses.delete(id);

  return deletedExpense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpenseById,
};
