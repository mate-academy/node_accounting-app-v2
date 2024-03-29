const express = require('express');
const userControllers = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getOne);
router.post('/', express.json(), userControllers.create);
router.delete('/:id', userControllers.remove);
router.patch('/:id', express.json(), userControllers.update);

module.exports = router;
