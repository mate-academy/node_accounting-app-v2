const { Router } = require('express');
const { GetUsersController } = require('../controllers/user');

const userRoutes = Router();

userRoutes.get('/', GetUsersController.handle);
userRoutes.get('/:id');
userRoutes.post('/');
userRoutes.patch('/:id');
userRoutes.delete('/:id');

module.exports = userRoutes;
