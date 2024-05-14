const { getId } = require('../utils/utils.js');
let users;

function getAll() {
  return users;
}

function getOne(id) {
  return users.find((item) => item.id.toString() === id.toString()) || null;
}

function createOne(userData) {
  const user = {
    id: getId(users),
    ...userData,
  };

  users.push(user);

  return user;
}

function updateOne(id, userData) {
  const user = getOne(id);

  if (!user) {
    return false;
  }

  const { name } = userData;

  user.name = name;

  return user;
}

function deleteOne(id) {
  const user = getOne(id);

  if (!user) {
    return false;
  }

  users = users.filter((item) => item.id.toString() !== id.toString());

  return true;
}

const createService = () => {
  users = [
    // {
    // id: 1,
    // name: 'Vlad',
    // }
  ];

  return {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
  };
};

module.exports = {
  createService,
};
