const findById = (collection, id) =>
  collection.find((item) => item.id === Number(id));
const filterById = (collection, id) =>
  collection.filter((item) => item.id !== Number(id));

const checkExpense = (userId, from, to, categories, expenses) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.userId === Number(userId),
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) <= new Date(to),
    );
  }

  if (categories) {
    const categoryList = categories.split(',');

    filteredExpenses = filteredExpenses.filter((e) => {
      return categoryList.includes(e.category);
    });
  }

  return filteredExpenses;
};

const createUserObject = (users, name) => {
  const id = users.length + 1;
  const user = { id, name };

  users.push(user);

  return user;
};

module.exports = {
  findById,
  filterById,
  createUserObject,
  checkExpense,
};
