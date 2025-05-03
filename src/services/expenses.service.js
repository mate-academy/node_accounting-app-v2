/* eslint-disable function-paren-newline */
// let expenses = [
//   {
//     id: 0,
//     userId: 0,
//     spentAt: '2025-03-28T09:15:00Z',
//     title: 'Кава в кав’ярні',
//     amount: 120,
//     category: 'Кав’ярні',
//     note: 'Зустріч з другом, взяв латте',
//   },
//   {
//     id: 12,
//     userId: 0,
//     spentAt: '2025-03-28T09:15:00Z',
//     title: 'Кручі стелі',
//     amount: 120,
//     category: 'Дім',
//     note: 'Залупа якась, хз чому',
//   },
//   {
//     id: 18,
//     userId: 0,
//     spentAt: '2025-03-28T09:15:00Z',
//     title: 'Чіз з колою та фрі',
//     amount: 120,
//     category: 'Макдак',
//     note: 'Накурився і не витримав',
//   },
//   {
//     id: 7,
//     userId: 1,
//     spentAt: '2025-03-29T14:40:00Z',
//     title: 'Квиток на автобус',
//     amount: 45,
//     category: 'Транспорт',
//     note: 'Їхав до центру міста',
//   },
//   {
//     id: 8,
//     userId: 2,
//     spentAt: '2025-03-29T14:40:00Z',
//     title: 'Квиток на автобус',
//     amount: 45,
//     category: 'Транспорт',
//     note: 'Їхав до центру міста',
//   },
//   {
//     id: 9,
//     userId: 0,
//     spentAt: '2025-03-29T14:40:00Z',
//     title: 'Квиток на автобус',
//     amount: 45,
//     category: 'Транспорт',
//     note: 'Їхав до центру міста',
//   },
//   {
//     id: 6,
//     userId: 1,
//     spentAt: '2023-03-30T17:05:00Z',
//     title: 'Овочі на базарі',
//     amount: 180,
//     category: 'Продукти',
//     note: 'Купив помідори, огірки, зелень',
//   },
//   {
//     id: 5,
//     userId: 0,
//     spentAt: '2025-05-30T17:05:00Z',
//     title: 'Сало з часником',
//     amount: 180,
//     category: 'Продукти',
//     note: 'Купив помідори, огірки, зелень',
//   },
//   {
//     id: 4,
//     userId: 0,
//     spentAt: '2025-03-30T17:05:00Z',
//     title: 'Ковбаса в Ганнусі',
//     amount: 180,
//     category: 'Продукти',
//     note: 'Купив помідори, огірки, зелень',
//   },
//   {
//     id: 3,
//     userId: 0,
//     spentAt: '2025-04-01T20:30:00Z',
//     title: 'Книга по Node.js',
//     amount: 520,
//     category: 'Навчання',
//     note: 'Замовив з Amazon для прокачки себе',
//   },
// ];

let expenses = [];

const getExpenses = (userId, categories, from, to) => {
  if (expenses.length === 0) {
    return expenses;
  }

  let filteredExpenses = [...expenses];

  if (userId || userId === 0) {
    // console.log(userId);

    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === userId,
    );
  }

  if (categories) {
    // Преобразуем строку в массив, если это не массив
    const categoryList = Array.isArray(categories)
      ? categories
      : categories.split(',').map((cat) => cat.trim());

    filteredExpenses = filteredExpenses.filter((expense) =>
      categoryList.includes(expense.category),
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt >= from,
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt <= to,
    );
  }

  return filteredExpenses;
};

const getExpense = (id) => {
  return expenses.find((expense) => expense.id === id) || null;
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const updateExpense = (id, updates) => {
  // { spentAt, title, amount, category, note }
  const expense = getExpense(id);
  // console.log(updates);

  const safeUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, value]) => value !== undefined),
  );

  Object.assign(expense, safeUpdates);

  return expense;
};

const createExpense = (newExpenseData) => {
  const newExpense = {
    id: +(Date.now() + Math.floor(Math.random() * 1000)),
    ...newExpenseData,
    note: newExpenseData.note === undefined ? '' : newExpenseData.note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  getExpense,
  deleteExpense,
  updateExpense,
  createExpense,
  clearExpenses,
};
