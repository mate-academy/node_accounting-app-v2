const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const userRouter = Router();

userRouter.get('/', usersController.getAllUsers);
userRouter.get('/:id', usersController.getOneUser);
userRouter.post('/', usersController.createUser);
userRouter.delete('/:id', usersController.deleteOneUser);
userRouter.patch('/:id', usersController.updateUser);
userRouter.put('/:id', usersController.updateUser);

module.exports = userRouter;
