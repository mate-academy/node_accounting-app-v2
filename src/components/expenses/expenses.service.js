let expenses = [];

export function getAll(userId, category, from, to) {
  expenses = expenses.filter((expense) => expense.userId === userId);
  expenses = expenses.filter((expense) => expense.category === category);
  expenses = expenses.filter((expense) => expense.spentAt >= from);
  expenses.expenses.filter((expense) => expense.spentAt <= to);

  return expenses;
}

export function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

export function getById(id) {
  const foundExpense = expenses.find((expense) => expense.id === id);

  return foundExpense || null;
}

export function remove(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
}

export function update({ id, spentAt, title, amount, category, note }) {
  const foundExpense = getById(id);

  Object.assign(foundExpense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return foundExpense;
}
