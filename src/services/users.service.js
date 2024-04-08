let users = [];

function getRandomInt() {
  const min = 1;
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
  return users.find((user) => user.id === +id);
};

const create = (name) => {
  const newUser = {
    id: getRandomInt(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter((u) => u.id !== +id);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  start,
};
