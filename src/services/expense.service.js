let expenses = [
  {
    id: 0,
    userId: 0,
    spentAt: '2024-04-10T08:30:00.000Z',
    title: 'Groceries',
    amount: 50,
    category: 'Food',
    note: 'Bought groceries for the week',
  },
  {
    id: 1,
    userId: 1,
    spentAt: '2024-04-12T15:45:00.000Z',
    title: 'Gasoline',
    amount: 40,
    category: 'Transportation',
    note: 'Filled up the car',
  },
  {
    id: 2,
    userId: 2,
    spentAt: '2024-04-15T10:20:00.000Z',
    title: 'Movie tickets',
    amount: 25,
    category: 'Entertainment',
    note: 'Went to see a movie with friends',
  },
  {
    id: 3,
    userId: 3,
    spentAt: '2024-04-18T12:00:00.000Z',
    title: 'Restaurant dinner',
    amount: 70,
    category: 'Food',
    note: 'Celebrated a special occasion',
  },
  {
    id: 4,
    userId: 4,
    spentAt: '2024-04-20T09:00:00.000Z',
    title: 'Fitness membership',
    amount: 100,
    category: 'Health',
    note: 'Renewed gym membership',
  },
];

// just for testing purposes (can be modified later on)
const categories = ['Food', 'Transportation', 'Entertainment', 'Health'];

const getAll = () => expenses;

const getOne = (id) => {
  return expenses.find((one) => one.id === +id);
};

const create = ({ userId, spentAt, title, amount, category, note = '' }) => {
  const newExpense = {
    id: expenses.length,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== +id);
};

const update = (
  { userId, spentAt, title, amount, category, note = '' },
  id,
) => {
  const ind = expenses.findIndex((expense) => expense.id === +id);
  const expenseToUpdate = {
    ...expenses[ind],
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses[ind] = expenseToUpdate;

  return expenseToUpdate;
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
  categories,
};
