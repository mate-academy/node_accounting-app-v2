import { v4 as uuidv4 } from 'uuid';

let expenses = [];

export const getAllexpenses = () => {
  return expenses;
};

export const getExpensesById = (id) => {
  return expenses.find((item) => item.id === id) || null;
};

export const createExpenses = (
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

export const uptadeExpens = ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expens = getExpensesById(id);

  Object.assign(expens, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expens;
};

export const deletExpenses = (id) => {
  expenses = expenses.filter((item) => item.id !== id);
};
