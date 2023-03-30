/* eslint-disable no-console */
/* eslint-disable max-len */
'use strict';

const { User } = require('../models/user');

async function getAll() {
  const foundUsers = await User.findAll();

  console.log('test');
  console.log(foundUsers);

  return foundUsers;
}

// const users = ['sdfa'];

// function runUsers() {
//   users = [];
// }

// function getAll() {
//   return users;
// };

// function addOne(name) {
//   const maxId = Math.max(...users.map(user => user.id));

//   const newUser = {
//     id: maxId > 0 ? maxId + 1 : 1,
//     name,
//   };

//   users.push(newUser);

//   return newUser;
// };

// function getOne(userId) {
//   const foundUser = users.find(user => user.id === Number(userId));

//   return foundUser || null;
// };

// function deleteOne(userId) {
//   const filteredUsers = users.filter(user => user.id !== Number(userId));

//   users = filteredUsers;
// };

// function updateOne(userId, name) {
//   const foundUser = getOne(userId);

//   Object.assign(foundUser, { name });

//   return foundUser;
// };

module.exports = {
  // runUsers,
  getAll,
  // addOne,
  // getOne,
  // deleteOne,
  // updateOne,
};

// export async function findGoodById(goodId: number) {
//   const foundGoods = await Good.findAll();

//   const foundGood = foundGoods.find(good => good.dataValues.id === Number(goodId));

//   return foundGood || null;
// }

// export async function addGood(name: string, colorId: number) {
//   const newGood = {
//     name,
//     colorId,
//   };

//   await Good.create(newGood);

//   return newGood;
// }

// export async function deleteGoodById(goodId: string) {
//   await Good.destroy({
//     where: {
//       id: goodId,
//     }
//   });
// }
