// let expenses = [
//   {
//     id: 0,
//     userId: 1,
//     spentAt: '2026-03-31T20:36:37.440Z',
//     title: 'Lambo',
//     amount: 10,
//     category: 'car',
//   },
//   {
//     id: 1,
//     userId: 2,
//     spentAt: '2026-03-31T20:29:44.442Z',
//     title: 'Kawa',
//     amount: 20,
//     category: 'moto',
//   },
//   {
//     id: 3,
//     userId: 0,
//     spentAt: '2026-03-31T20:37:08.317Z',
//     title: '_____',
//     amount: 30,
//     category: 'car',
//   },
//   {
//     id: 4,
//     userId: 3,
//     spentAt: '2026-03-31T20:37:08.317Z',
//     title: 'Velocity',
//     amount: 50,
//     category: 'velo',
//   },
// ];
let expenses = [];

const reset = () => {
  expenses = [];
};

const fieldsValidation = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined ||
    category === undefined
  ) {
    return {
      status: false,
      error: 'All fields must be filled in',
    };
  }

  if (typeof userId !== 'number' || typeof amount !== 'number') {
    return {
      status: false,
      error: 'Fields userId and amount must have number type',
    };
  }

  if (
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof category !== 'string' ||
    (note !== undefined && typeof note !== 'string')
  ) {
    return {
      status: false,
      error: 'SpentAt, title and category fields must have string type',
    };
  }

  if (isNaN(new Date(spentAt))) {
    return {
      status: false,
      error: 'Invalid date format',
    };
  }

  return { status: true };
};

const get = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((ex) => ex.id === id) || null;
};

const getWithFilters = ({ userId, categories, from, to }) => {
  let filtered = [...expenses];

  if (userId) {
    filtered = filtered.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const categoryList = categories.split(',');

    filtered = filtered.filter((e) => categoryList.includes(e.category));
  }

  if (from) {
    filtered = filtered.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    filtered = filtered.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  return filtered;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const maxId = expenses.length ? Math.max(...expenses.map((e) => e.id)) : 0;
  const newExpense = {
    id: maxId ? maxId + 1 : 0,
    userId,
    spentAt: spentAt || new Date().toISOString(),
    title,
    amount,
    category,
    note: note || null,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((e) => e.id !== id);
};

const update = (id, data) => {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, data);

  return expense;
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  getWithFilters,
  fieldsValidation,
  reset,
};
