'use strict';

const { Router } = require('express');
const ctrl = require('../controllers/users.controller');

const router = Router();

router.post('/', ctrl.createUser);
router.get('/', ctrl.listUsers);
router.get('/:id', ctrl.getUser);
router.patch('/:id', ctrl.updateUser);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;
