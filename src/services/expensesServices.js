let expenses = [];

let nextId = 1;

const idGenerate = () => {
  const id = nextId;

  nextId++;

  return id;
};

const clear = () => {
  expenses = [];
  nextId = 1;
};

const get = (userId, categories, from, to) => {
  return expenses.filter((expense) => {
    const checkUser = !userId || expense.userId === userId;

    const checkCategory =
      !categories.length || categories.includes(expense.category);

    const expenseDate = new Date(expense.spentAt).getTime();
    const fromTime = from ? new Date(from).getTime() : -Infinity;
    const toTime = to ? new Date(to).getTime() : Infinity;

    const checkDate = expenseDate >= fromTime && expenseDate <= toTime;

    return checkUser && checkCategory && checkDate;
  });
};

const getOne = (id) => expenses.find((expense) => expense.id === id) || null;

const add = ({ userId, title, spentAt, amount, category, note }) => {
  const newExpense = {
    id: idGenerate(),
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

const remove = (id) =>
  (expenses = expenses.filter((expense) => expense.id !== id));

const update = ({ id, ...data }) => {
  const toUpdate = getOne(id);

  return Object.assign(toUpdate, { ...data });
};

module.exports = {
  get,
  getOne,
  add,
  remove,
  update,
  clear,
};
