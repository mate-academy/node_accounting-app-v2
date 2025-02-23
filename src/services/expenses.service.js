import { uuid } from 'uuidv4';

let expenses = [
  {
    id: 0,
    userId: 0,
    spentAt: '2025-02-23T14:12:33.573Z',
    title: 'string',
    amount: 0,
    category: 'string',
    note: 'string',
  },
  {
    id: 2,
    userId: 1,
    spentAt: '2025-02-23T14:12:33.573Z',
    title: 'test',
    amount: 100,
    category: 'test',
    note: 'test',
  },
];

export const getAll = () => {
  return expenses;
};

export const getById = (id) => {
  return expenses.find((item) => item.id.toString() === id);
};

export const create = ({ userId, title, amount, category, note }) => {
  const newExpense = {
    id: uuid(),
    userId,
    spentAt: new Date(),
    title,
    amount,
    category: category || 'other',
    note: note || '',
  };

  expenses.push(newExpense);

  return newExpense;
};

export const update = ({ id, userId, title, amount, category, note }) => {
  const expensesById = getById(id);

  const updatedExpenses = Object.assign(expensesById, {
    userId,
    title,
    amount,
    category,
    note,
  });

  return updatedExpenses;
};

export const remove = (id) => {
  expenses = expenses.filter((item) => item.id.toString() !== id);
};
