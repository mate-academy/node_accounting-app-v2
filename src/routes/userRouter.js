'use strict';

const { Router } = require('express');
const userCantroller = require('../controllers/userController');

const router = Router();

router.get('/', userCantroller.getUsers);
router.get('/:id', userCantroller.getUser);
router.post('/', userCantroller.createUser);
router.patch('/:id', userCantroller.updateUser);
router.put('/:id', userCantroller.updateUser);
router.delete('/:id', userCantroller.deleteUser);

module.exports = router;
