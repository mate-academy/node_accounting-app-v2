import { User } from "../types/user";

let users: User[] = [];

export function getAll() {
  return users;
}

export function findUserById(userId: number) {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

export function addOne(name: string) {
  const maxID: number = Math.max(...users.map(user => user.id));
  const newUser: User = {
    id: maxID > 0 ? maxID + 1 : 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

export function updateOne(userId: number, name: string) {
  const foundUser: User | null = findUserById(userId);

  return Object.assign(foundUser?, { name });
}

export function deleteOne(userId) {
  const filteredUsers: User[] = users.filter(user => user.id !== userId);

  users = filteredUsers;
}
