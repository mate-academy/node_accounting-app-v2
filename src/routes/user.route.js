'use strict';

const Router = require('express');
const router = new Router();

const userController = require('../controllers/user.controllers');

router.get('/', userController.getAllUser);
router.get('/:id', userController.getOneUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.removeUser);

module.exports = router;
