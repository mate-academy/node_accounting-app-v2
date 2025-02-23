import { uuid } from 'uuidv4';

let users = [
  {
    id: 0,
    name: 'string',
  },
  {
    id: 1,
    name: 'Alex',
  },
  {
    id: 2,
    name: 'Mike',
  },
];

export const getAll = () => {
  return users;
};

export const getById = (id) => {
  return users.find((user) => user.id.toString() === id);
};

export const create = (name) => {
  const newUser = {
    name,
    id: uuid(),
  };

  users.push(newUser);

  return newUser;
};

export const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

export const remove = (id) => {
  users = users.filter((item) => item.id.toString() !== id);
};
