'use strict';

let expences = [
  {
    id: 1,
    userId: 1,
    spentAt: '2024-01-19T11:15:23.123Z',
    title: 'Shopping',
    amount: 50.75,
    category: 'Retail',
    note: 'Bought groceries',
  },
  {
    id: 2,
    userId: 1,
    spentAt: '2024-01-19T12:30:45.789Z',
    title: 'Gas',
    amount: 30.50,
    category: 'Transportation',
    note: 'Filled up the tank',
  },
  {
    id: 3,
    userId: 1,
    spentAt: '2024-01-19T14:05:10.222Z',
    title: 'Lunch',
    amount: 15.00,
    category: 'Food',
    note: 'Ate at a local restaurant',
  },
  {
    id: 4,
    userId: 1,
    spentAt: '2024-01-19T15:20:35.654Z',
    title: 'Movie',
    amount: 12.99,
    category: 'Entertainment',
    note: 'Watched a new release',
  },
  {
    id: 5,
    userId: 1,
    spentAt: '2024-01-19T16:45:12.987Z',
    title: 'Utilities',
    amount: 80.00,
    category: 'Bills',
    note: 'Paid monthly bills',
  },
];

const addExpence = (expence) => {
  expences.push(expence);
};

const validatePostData = (userId, spentAt, title, amount, category) => {
  const parsedDate = new Date(spentAt);
  const isValidDate = typeof spentAt === 'string'
                    && !isNaN(parsedDate.getTime());
  const isValidUserId = typeof userId === 'number';
  const isValidTitle = typeof title === 'string';
  const isValidAmount = typeof amount === 'number';
  const isValidCategory = typeof category === 'string';

  return isValidDate && isValidUserId
      && isValidTitle && isValidAmount
      && isValidCategory;
};

const getExpencesByUserId = (userId) => {
  return expences.filter(expence => expence.userId === userId);
};

const getExpenceById = (expenceId) => {
  return expences.find(({ id }) => id === +expenceId);
};

const removeExpence = (expenceId) => {
  expences = expences.filter(({ id }) => +expenceId !== id);
};

const getAllExpences = () => {
  return expences;
};

const makeCategoriesArray = (variable) => {
  if (variable) {
    return [ variable ];
  }

  return [];
};

const createExpenceId = () => {
  const ids = expences.map(expence => expence.id);

  return Math.max(...ids) + 1;
};

const getAllFilteredExpences = (userId, categories, from, to) => {
  let copyExpences = [...expences];
  let categoriesArray = categories;

  if (!Array.isArray(categoriesArray)) {
    categoriesArray = makeCategoriesArray(categories);
  }

  if (userId && getExpencesByUserId(userId).length) {
    copyExpences = getAllExpences(userId);
  }

  if (categoriesArray.length) {
    copyExpences = copyExpences.filter(({ category }) => {
      return categoriesArray.includes(category);
    });
  }

  if (from) {
    copyExpences = copyExpences.filter(({ spentAt }) => {
      return spentAt > from;
    });
  }

  if (to) {
    copyExpences = copyExpences.filter(({ spentAt }) => {
      return spentAt < to;
    });
  }

  if (from && to) {
    copyExpences = copyExpences.filter(({ spentAt }) => {
      return spentAt > from && spentAt < to;
    });
  }

  return copyExpences;
};

const updateExtence = (id, userId, spentAt, title, amount, category, note) => {
  const expenceToUpdate = getExpenceById(id);
  const index = expences.indexOf(expenceToUpdate);
  const parsedDate = new Date(spentAt);
  const isValidDate = typeof spentAt === 'string'
                    && !isNaN(parsedDate.getTime());
  const isValidUserId = typeof userId === 'number';
  const isValidTitle = typeof title === 'string';
  const isValidAmount = typeof amount === 'number';
  const isValidCategory = typeof category === 'string';

  if (isValidUserId) {
    expenceToUpdate.userId = userId;
  }

  if (isValidDate) {
    expenceToUpdate.spentAt = spentAt;
  }

  if (isValidTitle) {
    expenceToUpdate.title = title;
  }

  if (isValidAmount) {
    expenceToUpdate.amount = amount;
  }

  if (isValidCategory) {
    expenceToUpdate.category = category;
  }

  if (note) {
    expenceToUpdate.note = note;
  }

  expences.splice(index, 1, expenceToUpdate);
};

module.exports = {
  getAllExpences,
  getAllFilteredExpences,
  createExpenceId,
  getExpenceById,
  validatePostData,
  addExpence,
  removeExpence,
  updateExtence,
};
