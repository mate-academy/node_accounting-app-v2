const users = [];

let countId = 0;

const resetUsers = () => {
  users.splice(0, users.length);
};

const getAll = () => {
  return users;
};

const get = (id) => {
  const findOne = users.find((user) => user.id === +id);

  if (!findOne) {
    return false;
  }

  return findOne;
};

const add = (name) => {
  const newUser = {
    id: countId,
    name: name,
  };

  users.push(newUser);
  countId++;

  return newUser;
};

const remove = (id) => {
  const findOneIndex = users.findIndex((user) => user.id === id);

  if (findOneIndex < 0) {
    return false;
  }

  users.splice(findOneIndex, 1);

  return true;
};

const update = ({ id, name }) => {
  const user = get(+id);

  if (!user) {
    return false;
  }

  return Object.assign(user, { name });
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
  resetUsers,
};
