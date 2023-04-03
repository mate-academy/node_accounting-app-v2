import * as services from '../services/services'
import { Request, Response} from 'express';
import { validDatabases } from '../utils/helpers/validDatabases';
import { Database } from '../utils/types/database';
import validatePatchData from '../utils/helpers/validatePatchData';
import getTypeOfDatabaseItem from '../utils/helpers/getTypeOfDatabaseItem';

export function getAll (req: Request, res: Response) {
  const {headers: { db }, query} = req;
  if(validDatabases.some(item => item === db)) {
    res.send(services.getAll(db as Database, query))

    return;
  }

  res.sendStatus(404);
};

export function getById (req: Request, res: Response) {
  const {headers: { db }, params: { id }} = req;
  const item = services.getById(db as Database, id)

  if (!item) {
    res.status(404).send(`item not found in ${db}`);

    return;
  }

  res.send(item);

  return;
};

export function create (req: Request, res: Response) {
  const {headers: { db }, body} = req;

  if (body === null) {
    res.status(400).send('You should pass an item what you add');

    return;
  }

  if (body !== null) {
    const {type, correctDb, isValid} = getTypeOfDatabaseItem(body);
      switch(true) {
        case !isValid:
          res.status(400).send('You trying to pass an invalid item');

          return;
        case correctDb !== db:
          res.status(400)
            .send(`You trying to pass a ${type} to ${db}, try ${correctDb}`);

          return;
        default:
          break;
      };
  };
    res.send(services.create(db as Database, body))
};

export function remove (req: Request, res: Response) {
  const {headers: { db }, params: { id }} = req;
  const item = services.getById(db as Database, id)

  if (!item) {
    res.status(404).send(`item not found in ${db}`);

    return;
  };

  if(!id) {
    res.status(400)
      .send('You should pass the id if you want to delete something');

    return;
  };

  services.remove(db as Database, id);

  res.send(item);
};

export function patch (req: Request, res: Response) {
  const {headers: { db }, params: { id }, body} = req;
  const {type, correctDb, isValid} = validatePatchData(body);
  const item = services.getById(db as Database, id)

  if (!id) {
    res.status(400)
      .send('id of item should passed');

    return;
  }

  if (body === null) {
    res.status(400)
      .send('You should pass what you want to change');

      return;
  }

  if (!item) {
    res.status(404).send(`item not found in ${db}`);

    return;
  };


  switch(true) {
    case !isValid:
      res.status(400).send('You trying to pass invalid Patch data');

      return;
    case correctDb !== db:
      res.status(400)
        .send(`You trying to pass a ${type} to ${db}, try ${correctDb}`);

      return;

    default:
      break;
  };

  if(validDatabases.some(item => item === db)) {
    res.send(services.patch(db as Database, id, body))
  }

  res.sendStatus(404);
};
