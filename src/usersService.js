import { v4 as uuidv4 } from 'uuid';

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

export const usersService = {
  getAll,
  getUserById,
  create,
  addOneUser,
  deleteById,
  // update,
  // deleteMany,
  // updateMany
};
