import {Request, Response} from 'express';

import * as usersService from '../services/users';
import { User } from '../types/user';

export const getAll = (req: Request, res: Response) => {
  const users: User[] = usersService.getAll();

  res.send(users);
};

export const findOne = (req: Request, res: Response) => {
  const { userId } = req.params;
  const foundUser: User | null = usersService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  res.send(foundUser);
};

export const addOne = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser: User = usersService.addOne(name);

  res.statusCode(201);
  res.send(newUser);
};

export const updateOne = (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser: User | null = usersService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser: User | null = usersService.updateOne(userId, name);

  res.send(updatedUser);
};

export const deleteOne = (req: Request, res: Response) => {
  const { userId } = req.params;

  const foundUser: User | null = usersService.findUserById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  usersService.deleteOne(userId);

  res.sendStatus(204);
};
