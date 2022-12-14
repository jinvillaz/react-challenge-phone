import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import log4js from 'log4js';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import { db } from './database';
import path from 'path';

const logger = log4js.getLogger('App');
logger.level = 'debug';

const PORT = process.env.PORT || 4000;

export class App {
  constructor() {
    const app = express();
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    app.use(cors());
    app.use('/api', router);
    if (process.env.NODE_ENV !== 'development') {
      app.use(express.static(path.resolve(__dirname, '../client/build')));
      app.get('/*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
      });
    }
    
    app.listen(PORT, () => {
      logger.info(`The application is listening on port ${PORT}...`);
    });
  }

  async connectDatabase() {
    try {
      await db.$connect();
      logger.info('database connected.');
    } catch (ex) {
      logger.warn('database error on try to connected ', ex);
    }
  }
}
