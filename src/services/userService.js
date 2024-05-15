const users = [];

const userServise = {};

userServise.reset = () => {
  users.length = 0;
};

userServise.getAll = () => {
  return users;
};

userServise.getById = (id) => {
  return users.find((person) => person.id === Number(id)) || null;
};

userServise.create = (name) => {
  const user = {
    name,
    id: Math.floor(Math.random() * 10000),
  };

  users.push(user);

  return user;
};

userServise.update = ({ id, name }) => {
  const user = userServise.getById(id);

  Object.assign(user, { name });

  return user;
};

userServise.remove = (id) => {
  const index = users.findIndex((user) => user.id === Number(id));

  users.splice(index, 1);
};

module.exports = userServise;
