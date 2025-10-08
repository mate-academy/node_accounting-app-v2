import { v4 as uuidv4 } from 'uuid';

const users = [];

export function getAllUsers() {
  return users;
}

export function getSingleUser(id) {
  return users.find((u) => u.id === id);
}

export function addUser(name) {
  const user = { id: uuidv4(), name };

  users.push(user);

  return user;
}

export function removeUser(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [user] = users.splice(index, 1);

  return user;
}

export function updateUser({ id, name }) {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return;
  }

  return Object.assign(user, { id, name });
}

export const userService = {
  getAllUsers,
  getSingleUser,
  addUser,
  removeUser,
  updateUser,
};
