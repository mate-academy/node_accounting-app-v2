const { v4: uuidv4 } = require('uuid');
let expenses = [
  {
    id: 0,
    userId: 0,
    spentAt: '2024-03-26T08:30:59.278Z',
    title: 'string',
    amount: 0,
    category: 'string',
    note: 'string',
  },
];

const getAll = () => {
  return expenses;
};

const getOne = (id) => {
  return expenses.find((el) => el.id === +id) || null;
};

const create = (expense) => {
  const isValid = validateExpense(expense);

  if (!isValid) {
    return false;
  }

  expense.id = uuidv4();
  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  const expense = expenses.find((el) => el.id === +id) || null;

  if (!expense) {
    return false;
  }

  expenses = expenses.filter((el) => el.id === id);

  return true;
};

const update = (id, body) => {
  const isValid = validateExpense({ ...body, id, userId: 0 });

  if (!isValid) {
    return 'Wrong body';
  }

  const expense = expenses.find((el) => el.id === +id);

  if (!expense) {
    return 'Not found';
  }

  const { spentAt, title, amount, category, note } = body;

  Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

const validateExpense = (expense) => {
  if (typeof expense.userId !== 'number') {
    return false;
  }

  if (typeof expense.spentAt !== 'string' || !expense.spentAt.length) {
    return false;
  }

  if (typeof expense.title !== 'string' || !expense.title.length) {
    return false;
  }

  if (typeof expense.amount !== 'number') {
    return false;
  }

  if (typeof expense.category !== 'string' || !expense.category.length) {
    return false;
  }

  if (typeof expense.note !== 'string') {
    return false;
  }

  return true;
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
