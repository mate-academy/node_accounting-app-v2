const userService = require('./users.service.js');
const expenses = [];

let countId = 0;

const resetExpenses = () => expenses.splice(0, expenses.length);
const transformToDate = (date) => new Date(date);

const getAll = ({ userId, categories, from, to }) => {
  if (!userId && !categories && !from && !to) {
    return expenses;
  }

  const fromDate = from ? transformToDate(from) : false;
  const toDate = to ? transformToDate(to) : false;

  return expenses.filter((expense) => {
    const date = transformToDate(expense.spentAt);
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

const add = (data) => {
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

  const user = userService.get(userId);

  if (!user) {
    return false;
  }

  const newExpense = { id: countId, ...data };

  expenses.push(newExpense);
  countId++;

  return newExpense;
};

const get = (id) => {
  if (!id || isNaN(+id)) {
    return false;
  }

  const findExpense = expenses.find((expense) => expense.id === +id) || -1;

  if (findExpense < 0) {
    return false;
  }

  return findExpense;
};

const remove = (id) => {
  const findOneIndex = expenses.findIndex((expense) => expense.id === +id);

  if (findOneIndex < 0) {
    return false;
  }

  expenses.splice(findOneIndex, 1);

  return true;
};

const update = (id, expense) => {
  const findExpense = get(id);

  if (!findExpense) {
    return false;
  }

  return Object.assign(findExpense, expense);
};

module.exports = {
  getAll,
  add,
  get,
  remove,
  update,
  resetExpenses,
};
