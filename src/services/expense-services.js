const {
  createRequiredFields,
  updateRequiredFields,
} = require('../types/expense-type');
const { validFields } = require('../utils/validFields');

let storeExpenses = [];

const createExpenseService = (expense) => {
  const errors = validFields(expense, createRequiredFields);

  if (errors.length > 0) {
    throw new Error(errors);
  }

  const newExpense = {
    id: storeExpenses.length + 1,
    spentAt: new Date(),
    ...expense,
  };

  storeExpenses.push(newExpense);

  return newExpense;
};

const getAllExpensesService = (query) => {
  const { userId, categories, from, to } = query;

  let expenses = storeExpenses;

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === Number(userId));
  }

  if (categories) {
    const categoryArray = categories.split(',');

    expenses = expenses.filter((expense) => {
      return categoryArray.includes(expense.category);
    });
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    expenses = expenses.filter(
      (expense) =>
        new Date(expense.spentAt) >= fromDate &&
        new Date(expense.spentAt) <= toDate,
    );
  }

  return expenses;
};

const getExpenseByIdService = (id) => {
  const expense = storeExpenses.find((item) => item.id === id);

  if (!expense) {
    throw new Error('Expense not found');
  }

  return expense;
};

const updateExpenseService = (id, updateExpense) => {
  const expense = getExpenseByIdService(id);

  const filterUpdateExpenseFields = updateRequiredFields.map(
    (field) => Object.keys(field)[0],
  );

  Object.keys(updateExpense).forEach((field) => {
    if (!filterUpdateExpenseFields.includes(field)) {
      delete updateExpense[field];
    }
  });

  Object.assign(expense, updateExpense);

  return expense;
};

const deleteExpenseService = (id) => {
  const expense = getExpenseByIdService(id);

  storeExpenses = storeExpenses.filter((item) => item.id !== expense.id);
};

const resetExpensesService = () => {
  storeExpenses = [];
};

module.exports = {
  createExpenseService,
  getAllExpensesService,

  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,

  resetExpensesService,
};
