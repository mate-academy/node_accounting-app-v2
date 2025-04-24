const users = [];

let countId = 0;

const resetUsers = () => {
  users.splice(0, users.length);
};

const getAll = () => {
  return users;
}

const add = (name) => {
  const newUser = {
    id: countId,
    name,
  };

  users.push(newUser);
  countId++;

  return newUser;
}

const get = (id) => {
  const foundUser = users.find(user => user.id === +id);

  if (!foundUser) {
    return false;
  }

  return foundUser
}

const remove = (id) => {
  const foundIndex = users.findIndex(user => user.id === +id);

  if (foundIndex < 0) {
    return false;
  }

  users.splice(foundIndex, 1);

  return true;
}

const update = (id, name) => {
  const userToUpdate = get(+id);

  if (!userToUpdate) {
    return false;
  }

  return Object.assign(userToUpdate, { name });
}

module.exports = {
  getAll,
  resetUsers,
  add,
  get,
  remove,
  update
}