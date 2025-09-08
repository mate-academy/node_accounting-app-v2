let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const get = (queryFilter, value) => {
  return (
    expenses.filter((item) => String(item[queryFilter]) === String(value)) ||
    null
  );
};

const add = ({ ...body }) => {
  const id = expenses.length || 0;
  const exp = { id, ...body };

  expenses.push(exp);

  return exp;
};

const remove = (id) => {
  const index = expenses.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const [deleted] = expenses.splice(index, 1);

  return deleted;
};

const update = (id, body) => {
  const exp = expenses.find((item) => item.id === id) || null;

  if (!exp) {
    return null;
  }

  return Object.assign(exp, body);
};

module.exports = {
  reset,
  getAll,
  get,
  add,
  remove,
  update,
};
