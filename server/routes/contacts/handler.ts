import { Request, Response } from 'express';
import log4js from 'log4js';
import { schema } from './schema-validator';
import { db } from '../../database';

const logger = log4js.getLogger('ContactHandler');
logger.level = 'debug';
const BAD_REQUEST = 400;

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const getHandler = async (req: Request, res: Response) => {
  let query = {};
  if (req.query.lastName) {
    query = {
      where: {
        lastName: {
          contains: req.query.lastName,
          mode: 'insensitive',
        },
      },
    };
  }
  const data = await db.contacts.findMany(query);
  res.json(data);
};

export const getByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await db.contacts.findFirstOrThrow({ where: { id } });
    if (!data) {
      return res.status(BAD_REQUEST).send('Not found');
    }
    res.json(data);
  } catch (e) {
    logger.warn(e);
    return res.status(BAD_REQUEST).send('Not found');
  }
};

export const postHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    await schema.validate(data, { abortEarly: false, strict: true });
    const item: Contact = {
      ...data,
    };
    const contactCreated = await db.contacts.create({ data: item });
    res.json(contactCreated);
  } catch (e) {
    logger.warn(e);
    if (e.errors) {
      return res.status(BAD_REQUEST).send(e.errors);
    } else {
      return res.status(BAD_REQUEST).send(e.message);
    }
  }
};

export const putHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;

    await schema.validate(data, { abortEarly: false, strict: true });
    const contactUpdated = await db.contacts.update({ where: { id }, data });
    res.json(contactUpdated);
  } catch (e) {
    logger.warn(e);
    if (e.errors) {
      return res.status(BAD_REQUEST).send(e.errors);
    } else {
      return res.status(BAD_REQUEST).send(e.message);
    }
  }
};

export const deleteHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await db.contacts.delete({ where: { id }});
    res.send(id);
  } catch (e) {
    return res.status(BAD_REQUEST).send(e.message);
  }
};
