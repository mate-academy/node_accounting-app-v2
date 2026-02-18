const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.create);
router.delete('/:id', userController.remove);
router.patch('/:id', userController.update);

module.exports = router;
