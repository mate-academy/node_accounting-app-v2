const { getMaxId } = require('./getMaxId.js');
let users = [];

const start = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const create = (name) => {
  const user = {
    name: name,
    id: getMaxId(users) + 1,
    // parseInt(uuidv4(10).replaceAll('-', ''), 16),
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== +id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  if (user) {
    // user.name = name;
    Object.assign(user, { name });

    return user;
  }

  return null;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  remove,
  update,
};
