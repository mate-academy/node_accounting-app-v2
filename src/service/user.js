const checkIsValidSchema = require('../utils/checkIsValidSchema');

let USERS = [];
let USERS_ID = 1;

const UserSchema = {
  id: 'number',
  name: 'string',
};

const getAll = () => {
  return USERS;
};

const getById = (id) => {
  return USERS.find((item) => item.id === id);
};

const create = ({ name }) => {
  const user = {
    name,
    id: USERS_ID,
  };

  if (!checkIsValidSchema(UserSchema, user)) {
    return null;
  }

  USERS.push(user);

  USERS_ID++;

  return user;
};

const remove = (id) => {
  USERS = USERS.filter((user) => user.id !== id);
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { ...user, name });

  return user;
};

const clear = () => {
  USERS = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  clear,
};
