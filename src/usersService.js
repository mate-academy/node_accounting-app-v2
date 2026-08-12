const { v4: uuidv4 } = require('uuid');

export function getAll(users) {
  return users;
}

export function create(title, users) {
  const user = { id: uuidv4(), title, completed: false };

  users.push(user);

  return user;
}

export function getUserById(userId, users) {
  const user = users.find((el) => el.id === userId);

  return user;
}

export function deleteUserById(userId, data) {
  const index = data.findIndex((todo) => todo.id === userId);

  if (index === -1) {
    return;
  }

  const [item] = data.splice(index, 1);

  if (!item) {
    return;
  }

  return item;
}

export function patchItem(userId, name, data) {
  const itemIndex = data.findIndex((el) => el.id === userId);

  if (itemIndex === -1) {
    return;
  }

  data[itemIndex].name = name;

  return {
    id: userId,
    name,
  };

  // data.map((el) => {
  //   if (el.id === userId) {
  //     console.log(el.id);
  //     console.log(userId);
  //     console.log(el.id === userId);

  //     return {
  //       id: userId,
  //       name: name,
  //     };
  //   }

  //   return el;
  // });
}

export function addOneUser(name, users) {
  const user = { id: uuidv4(), name };

  users.push(user);

  return user;
}

export function deleteById(id, users) {
  const index = users.findIndex((el) => el.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

const usersService = {
  getAll,
  getUserById,
  create,
  addOneUser,
  patchItem,
  deleteById,
  // update,
  // deleteMany,
  // updateMany
};

module.exports = {
  ...usersService,
  deleteUserById,
};
