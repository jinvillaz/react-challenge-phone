import express from 'express';
import bodyParser from 'body-parser';
import log4js from 'log4js';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import { db } from './database';
import path from 'path';

const logger = log4js.getLogger('App');
logger.level = 'debug';

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
    }
    app.listen(8000, () => {
      logger.info('The application is listening on port 8000...');
    });
  }

  async connectDatabase() {
    await db.$connect();
    logger.info('database connected.');
  }
}
