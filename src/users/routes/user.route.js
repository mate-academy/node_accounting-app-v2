'use strict';

const express = require('express');
const userController = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/', userController.get);

router.get('/:id', userController.getOne);

router.post('/', userController.create);

router.put('/:id', userController.update);

router.delete('/:id', userController.remove);

// const isAction = (action) => {
//   return (req, res, next) => {
//     if (req.query.action === action) {
//       next();
//     } else {
//       next('route');
//     }
//   };
// };

// router.patch('/', isAction('delete'), userController.removeMany);
// router.patch('/', isAction('update'), userController.updateMany);

module.exports = router;
