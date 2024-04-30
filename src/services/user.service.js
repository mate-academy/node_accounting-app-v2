let users = [];

function getRandomNumber() {
  const min = 0;
  const max = 100;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const start = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((item) => item.id === +id);
};

const create = (title) => {
  const item = { name: title, id: getRandomNumber() };

  users.push(item);

  return item;
};

const remove = (id) => {
  users = users.filter((item) => item.id !== +id);
};

const change = (id, title) => {
  const user = getById(id);

  user.name = title;

  return user;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  remove,
  change,
};
