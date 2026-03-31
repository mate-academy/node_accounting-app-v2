let users = [];

const setInitUsers = () => {
  users = [];
};

let nextUserId = 1;

const getAll = () => {
  return [...users];
};

const getById = (id) => {
  const idNum = Number(id);

  return users.find((user) => user.id === idNum);
};

const create = ({ name }) => {
  const user = { id: nextUserId, name };

  users.push(user);
  nextUserId++;

  return user;
};

const remove = (id) => {
  const idNum = Number(id);

  const index = users.findIndex((user) => user.id === idNum);

  if (index === -1) {
    return;
  }

  const [removed] = users.splice(index, 1);

  return removed;
};

const update = ({ id, name }) => {
  const idNum = Number(id);

  const updatedUser = users.find((user) => user.id === idNum) || null;

  if (!updatedUser) {
    return;
  }

  return Object.assign(updatedUser, { name });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  setInitUsers,
};
