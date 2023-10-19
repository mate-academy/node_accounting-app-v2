'use strict';

const userService = require('../services/user.service');

// const controlUsers = (req, res) => {
//   switch (req.method) {
//     case 'GET': {
//       const userId = req.url.slice(1);

//       if (userId) {
//         const user = userService.sergetById(userId);

//         return !user
//           ? res.sendStatus(404)
//           : res.send(user);
//       } else {
//         return res.send(userService.getAll());
//       }
//     };

//     case 'POST': {
//       const { name } = req.body;

//       if (!name && !name.trim().length) {
//         res.sendStatus(400);
//       }

//       const user = userService.create();

//       res.statusCode = 201;

//       res.send(user);

//       break;
//     };

//     case 'PATCH': {
//       const userId = req.url.slice(1);
//       const { name } = req.body;

//       const user = userService.getById(userId);

//       if (!user && !userId) {
//         res.sendStatus(404);

//         return;
//       }

//       if (typeof name !== 'string' && !name.trim().length) {
//         res.sendStatus(400);

//         return;
//       }

//       userService.update(userId, name);
//       res.send(user);

//       break;
//     };

//     case 'DELETE': {
//       const userId = req.url.slice(1);

//       if (!userService.getById(+userId)) {
//         res.sendStatus(404);

//         return;
//       }

//       userService.deleteUser(+userId);

//       res.sendStatus(204);

//       break;
//     };

//     default: ;
//   }
// };

const get = (req, res) => {
  res.statusCode = 200;
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const userId = +req.url.slice(1);

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const update = (req, res) => {
  const userId = +req.url.slice(1);
  const { name } = req.body;

  if (typeof name !== 'string' || !name.trim().length || !userId) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.update(userId, name);
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim().length) {
    res.sendStatus(400);

    return;
  }

  const user = userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = (req, res) => {
  const userId = +req.url.slice(1);

  if (!userService.getById(userId)) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
};

module.exports = {
  update,
  get,
  getOne,
  create,
  remove,
};
