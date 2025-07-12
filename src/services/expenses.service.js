import { v4 as uuidv4 } from 'uuid';

let expenses = [];

export const getAllExpenses = () => {
  return expenses;
};

export const getExpenseById = (id) => {
  return expenses.find((item) => item.id === id) || null;
};

export const createExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const expens = {
    id: uuidv4(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expens);

  return expens;
};

export const updateExpense = ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expens = getExpenseById(id);

  Object.assign(expens, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expens;
};

export const deleteExpense = (id) => {
  expenses = expenses.filter((item) => item.id !== id);
};
