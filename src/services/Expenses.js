export function getByCategory(expenses, category) {
  return expenses
    .filter(expense => expense.category === category);
}

export function getByUser(expenses, userId) {
  return expenses.filter(expense => expense.userId === +userId);
}

export function getByDate(expenses, from, to) {
  return expenses.filter((expense) =>
    expense.spentAt > from && expense.spentAt < to);
}

export function create(
  expenses,
  userId,
  spentAt,
  title,
  amount,
  category,
  note
) {
  const newExpenses = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
}

export function getID(expenses, id) {
  const expensesFound = expenses.find((expense) => expense.id === +id);

  return expensesFound;
}

export function remove(expenses, id) {
  return expenses.filter((expense) => expense.id !== +id);
}

export function update(findExpense, body) {
  Object.assign(findExpense, body);

  return findExpense;
}
