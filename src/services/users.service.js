// let users = [
//   { id: 0, name: 'Pasha' },
//   { id: 1, name: 'Niko' },
//   { id: 2, name: 'Olena' },
// ];

let users = [];

const reset = () => {
  users = [];
};

const get = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const create = (name) => {
  const maxId = users.length ? Math.max(...users.map((user) => user.id)) : -1;
  const newUser = {
    id: maxId + 1,
    name: name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  reset,
};
