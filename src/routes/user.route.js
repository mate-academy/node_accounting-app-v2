const userControllers = require('../controllers/user.controller.js');

const express = require('express');

const router = express.Router();

router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getOne);

module.exports = router;
