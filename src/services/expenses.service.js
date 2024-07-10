let expenses = [];
let errors = {};

const resetExpenses = () => {
  expenses = [];
};

const getAllExpenses = ({ userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  return expenses.find((expense) => expense.userId === Number(id));
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: expenses.length,
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

const updateData = (id, data) => {
  const expense = getExpenseById(id);

  Object.assign(expense, data);

  return expense;
};

const checkData = (data, name) => {
  const requiredMessage = `"${name}" is required`;

  switch (name) {
    case 'userId': {
      if (!data) {
        errors[name] = requiredMessage;
      } else if (typeof +data !== 'number') {
        errors[name] = `"${name}" must be a number`;
      }
      break;
    }

    case 'spentAt': {
      if (!data) {
        errors[name] = requiredMessage;
      } else if (isNaN(Date.parse(data))) {
        errors[name] = `"${name}" is not a string date`;
      }
      break;
    }

    case 'amount': {
      if (!data) {
        errors[name] = requiredMessage;
      } else if (typeof data !== 'number' || data < 0) {
        errors[name] = `"${name}" must be a positive number`;
      }
      break;
    }

    default: {
      if (!data) {
        errors[name] = requiredMessage;
      } else if (typeof data !== 'string' || !data.trim()) {
        errors[name] = `"${name}" must be a non-empty string`;
      }
    }
  }
};

const validate = ({ userId, spentAt, title, amount, category, note }) => {
  errors = {};

  [
    { data: userId, name: 'userId' },
    { data: spentAt, name: 'spentAt' },
    { data: amount, name: 'amount' },
    { data: title, name: 'title' },
    { data: category, name: 'category' },
    { data: note, name: 'note' },
  ].forEach(({ data, name }) => checkData(data, name));
};

const getErrors = () => errors;

module.exports = {
  resetExpenses,
  getAllExpenses,
  getExpenseById,
  remove,
  updateData,
  createExpense,
  checkData,
  validate,
  getErrors,
};
