'use strict';

const findUser = (id, users) => {
  return users.find(user => +user.id === +id) || null;
};

module.exports = {
  findUser,
};
