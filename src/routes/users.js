'use strict';

const express = require('express');

const usersRouter = express.Router();

const userControlers = require('../controllers/users');

usersRouter.get('/', userControlers.getAll);

usersRouter.get('/:userId', userControlers.getOne);

usersRouter.post('/', express.json(), userControlers.add);

usersRouter.delete('/:userId', userControlers.remove);

usersRouter.patch('/:userId', express.json(), userControlers.update);

// const hasAction = (action) => {
//   return (req, next) => {
//     if (req.query.action !== action) {
//       next();
//     } else {
//       next('route');
//     }
//   };
// };

// usersRouter.patch('/users', hasAction('delete'), userControlers.removeMany);
// usersRouter.patch('/users', hasAction('update'), userControlers.updateMany);

module.exports = usersRouter;
