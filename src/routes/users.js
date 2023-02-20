'use strict';

const router = require('express').Router();

const {
  getUsersController,
  getUserController,
  addUserController,
  removeUserController,
  updateUserController,
} = require('../controllers/users');

router.get('/', getUsersController);
router.get('/:id', getUserController);
router.post('/', addUserController);
router.patch('/:id', updateUserController);
router.delete('/:id', removeUserController);

module.exports = router;
