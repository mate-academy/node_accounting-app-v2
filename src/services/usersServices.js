let users = [];

let nextId = 1;

const idGenerate = () => {
  const id = nextId;

  nextId++;

  return id;
};

const clear = () => {
  users = [];
  nextId = 1;
};

const get = () => users;

const getOne = (id) => users.find((user) => user.id === id) || null;

const add = (name) => {
  const newUser = {
    id: idGenerate(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => (users = users.filter((user) => user.id !== id));

const update = ({ id, name }) => {
  const user = getOne(id);

  return Object.assign(user, { name });
};

module.exports = {
  get,
  getOne,
  add,
  remove,
  update,
  clear,
};
