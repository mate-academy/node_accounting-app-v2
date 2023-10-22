'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.get);
router.get('/:id', userController.getOne);
router.patch('/:id', userController.update);
router.post('/', userController.create);
router.delete('/:id', userController.remove);

module.exports = router;
