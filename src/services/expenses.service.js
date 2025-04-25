const { getById: getUserById } = require('./users.service');
const { randomId } = require('./users.service');

const expenses = [
  // {
  //   id: 0,
  //   userId: 2,
  //   spentAt: '2025-04-25T07:39:10.919Z',
  //   title: 'Cheap stuff',
  //   amount: 200,
  //   category: 'Aliexpress',
  //   note: 'Dakimakura with Rayan Gosling',
  // },
  // {
  //   id: 1,
  //   userId: 1,
  //   spentAt: '2025-04-25T07:39:10.919Z',
  //   title: 'Politic courses',
  //   amount: 1000,
  //   category: 'Education',
  //   note: 'Politcouch',
  // },
  // {
  //   id: 2,
  //   userId: 0,
  //   spentAt: '2025-04-25T07:39:10.919Z',
  //   title: 'Milk',
  //   amount: 10,
  //   category: 'Groceries',
  //   note: 'Some milk',
  // },
];

const getAll = (queries) => {
  const { userId, categories, from, to } = queries;

  if (!userId && !categories && !from && !to) {
    return expenses;
  }

  const fromDate = from ? new Date(from) : false;
  const toDate = to ? new Date(to) : false;

  return expenses.filter((expense) => {
    const date = new Date(expense.spentAt);
    const checkedUserId = !isNaN(+userId) ? +userId : null;

    if (userId && expense.userId !== checkedUserId) {
      return false;
    }

    if (fromDate && toDate) {
      if (date < fromDate || date > toDate) {
        return false;
      }
    }

    if (fromDate && !toDate && date <= fromDate) {
      return false;
    }

    if (toDate && !fromDate && date >= toDate) {
      return false;
    }

    if (categories && categories !== expense.category) {
      return false;
    }

    return true;
  });
};

const create = (data) => {
  const { userId, spentAt, title, amount, category, note } = data;

  if (
    userId < 0 ||
    isNaN(+userId) ||
    !spentAt ||
    !title ||
    amount < 0 ||
    isNaN(+amount) ||
    !category ||
    !note
  ) {
    return false;
  }

  const user = getUserById(+userId);

  if (!user) {
    return false;
  }

  const newExpense = { id: randomId(), ...data };

  expenses.push(newExpense);

  return newExpense;
};

const getById = (id) => {
  const targetExpense = expenses.find((expense) => expense.id === id);

  return targetExpense;
};

const remove = (id) => {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);

  return true;
};

const update = (id, expense) => {
  const targetExpense = expenses.find((oneExpense) => oneExpense.id === id);

  if (!targetExpense) {
    return undefined;
  }

  Object.assign(targetExpense, expense);

  return targetExpense;
};

const resetExpenses = () => {
  expenses.splice(0, expenses.length);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  resetExpenses,
};
