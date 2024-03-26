const userControllers = require('../controllers/user.controller.js');

const express = require('express');

const router = express.Router();

router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getOne);
router.post('/', userControllers.create);
router.delete('/:id', userControllers.remove);
router.patch('/:id', userControllers.update);

module.exports = router;
