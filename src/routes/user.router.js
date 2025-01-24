const userRouter = require('express').Router();
const { userService } = require('../api/user.service');

module.exports = { userRouter };

userRouter.get('/', async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.createUser(name);

  res.status(201).json(user);
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUser(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
});

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deleteUser = await userService.deleteUser(+id);

  if (!deleteUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

userRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!data) {
    return res.sendStatus(400);
  }

  const userUpdated = await userService.updateUser(+id, data);

  if (!userUpdated) {
    return res.sendStatus(404);
  }

  res.status(200).json(userUpdated);
});
