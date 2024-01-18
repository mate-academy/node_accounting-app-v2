'use strict';

const Router = require('express');
const router = new Router();

const userController = require('../controllers/user.controllers');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
