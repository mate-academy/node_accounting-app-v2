'use strict';

let expenses = [
  // {
  //   'userId': 2,
  //   'spentAt': '2022-01-29T07:51:25.586Z',
  //   'title': 'string',
  //   'amount': 100,
  //   'category': 'car',
  //   'note': 'car',
  //   'id': 1706784240585,
  // },
  // {
  //   'userId': 4,
  //   'spentAt': '2021-01-29T07:51:25.586Z',
  //   'title': 'string',
  //   'amount': 100,
  //   'category': 'Electronics',
  //   'note': 'something',
  //   'id': 1706784244813,
  // },
  // {
  //   'userId': 4,
  //   'spentAt': '2024-01-29T07:51:25.586Z',
  //   'title': 'string',
  //   'amount': 10,
  //   'category': 'string',
  //   'note': 'something',
  //   'id': 1706784248044,
  // },
];

const get = (req) => {
  if (req.query) {
    const newExpenses = expenses.filter(expense => {
      return Object.entries(req.query).every(([key, value]) => {
        const lookingVal = new Date(value).getTime();
        const currVal = new Date(expense.spentAt).getTime();

        switch (key) {
          case 'userId':
            return expense[key] === +value;

          case 'from':
            return currVal >= lookingVal;

          case 'to':
            return currVal <= lookingVal;

          default:
            return value.includes(expense.category);
        }
      });
    });

    return newExpenses;
  } else {
    return expenses;
  }
};

const getById = (id) => {
  return expenses.find(expense => +expense.id === +id) || null;
};

const create = (data) => {
  const expense = {
    ...data,
    id: new Date().getTime(),
  };

  expenses.push(expense);

  return expense;
};

const update = (id, data) => {
  const expense = getById(id);

  if (expense) {
    Object.assign(expense, { ...data });

    return expense;
  }
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

module.exports = {
  expenses,
  get,
  getById,
  create,
  update,
  remove,
};
